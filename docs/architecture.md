# System Architecture

## Embodied Brain Cloud — Detailed Architecture

### 1. System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Layer                            │
│  Robot SDK (gRPC)  │  Web Console  │  CLI Tools             │
│  - H.264 encode    │  - Dashboard  │  - Data upload         │
│  - Joint mapping   │  - LoRA mgmt  │  - Training submit     │
│  - Safety bounds   │  - Monitoring │  - Model versioning    │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                   Gateway Layer                             │
│  API Gateway (auth / rate limit / metering)                 │
│  Instance Manager (GPU lifecycle / auto-scaling / routing)  │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                 Inference Cluster                            │
│  vLLM + S-LoRA/Punica    │  Action Pipeline                │
│  - Shared base model     │  - NVDEC → Vision Encoder       │
│  - Dynamic LoRA (SGMV)   │  - LLM Backbone + LoRA          │
│  - Multi-tenant serving  │  - Action Expert (flow matching) │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                  Training Cluster                            │
│  SFT Engine (LoRA)  │  RL Engine (PPO/GRPO)  │  Data Mgmt  │
│  - OpenPI / HF      │  - ManiSkill / LIBERO  │  - LeRobot v2│
│  - FSDP distributed │  - VLM-as-Judge reward │  - Privacy   │
└─────────────────────────────────────────────────────────────┘
```

### 2. Client Layer

#### 2.1 Robot SDK (gRPC)

The Robot SDK runs on the robot's local controller (e.g., Raspberry Pi, ESP32, any SoC with H.264 encoder).

**Responsibilities:**
- **H.264 Encoding:** Hardware-accelerated video encoding at 224x224 or 448x448
- **gRPC Streaming:** Bidirectional stream — sends frames, receives action chunks
- **Joint Mapping:** Translates generic action vectors to robot-specific joint commands
- **Safety Layer:** Local safety bounds (joint limits, force limits, collision detection)
- **Action Chunk Buffer:** Caches 500ms-1s of future actions for WiFi dropout immunity

```
Camera → H.264 Encode → gRPC Stream → Cloud
                                         ↓
Robot Joints ← Safety Check ← Action Buffer ← Action Chunk
```

**Supported Robots (built-in adapters):**
- Franka Panda (7-DOF arm)
- UR5/UR10 (6-DOF arm)
- ALOHA (dual-arm bimanual)
- Unitree G1 (humanoid)
- Custom via URDF upload

#### 2.2 Web Console

- Real-time dashboard: active sessions, latency, throughput
- LoRA management: upload adapters, version control, rollback
- Training job management: submit, monitor, view loss curves
- Billing: usage metering, plan management

#### 2.3 CLI Tools

```bash
# Upload demonstration data
ebc data upload --format lerobot_v2 --path ./demos/

# Submit training job
ebc train submit --model pi05 --data my_dataset --epochs 50

# Create inference session
ebc session create --model pi05 --lora my_lora_v3 --robot franka
```

### 3. Gateway Layer

#### 3.1 API Gateway

- **Authentication:** API key + JWT token validation
- **Rate Limiting:** Per-customer, per-session throttling
- **Metering:** Token counting, frame counting, GPU-seconds tracking
- **Routing:** Direct requests to correct GPU instance based on model + LoRA

#### 3.2 Instance Manager

- **GPU Lifecycle:** Provision, health-check, drain, terminate GPU instances
- **Auto-scaling:** Scale GPU pool based on active session count and queue depth
- **LoRA Placement:** Decide which LoRAs are hot/warm/cold on which GPU
- **Load Balancing:** Route sessions to GPUs with pre-loaded LoRAs (minimize cold starts)

```
Request → Auth → Rate Limit → Meter → Route to GPU (with LoRA pre-loaded)
```

### 4. Inference Cluster

#### 4.1 Serving Engine (vLLM + S-LoRA)

The core inference engine builds on vLLM with S-LoRA/Punica extensions for multi-tenant LoRA serving.

**Key Components:**

**Base Model Pool:**
- Shared base model weights (W_0) frozen in GPU VRAM
- Supports: pi0.5, OpenVLA-OFT, GR00T N1.5, SmolVLA, RDT-1B, DiffusionVLA
- One base model per GPU (can serve thousands of LoRA variants)

**LoRA Adapter Pool:**
- SGMV (Scatter-Gather Matrix-Vector) kernel for dynamic LoRA selection
- Per-request LoRA application: `y = xW_0 + x * A_i * B_i`
- Zero switching cost between different customer LoRAs in same batch

**Three-Tier LoRA Cache:**

| Tier | Storage | Latency | Capacity |
|------|---------|---------|----------|
| Hot | GPU VRAM | 0ms | ~100 adapters (rank 16) |
| Warm | CPU RAM | ~2ms | ~2000 adapters |
| Cold | S3 / NFS | ~40ms | Unlimited |

**Scheduler:**
- Round-robin time-slice scheduling across active sessions
- Priority queue: real-time sessions > training > batch
- Batch assembly: group requests for same base model

#### 4.2 Action Pipeline

The VLA inference pipeline processes video frames into robot actions:

```
H.264 Frame
    │
    ▼
┌─────────┐
│ NVDEC   │  ← Hardware video decode on GPU
│ Decode  │
└────┬────┘
     │ RGB tensor (224x224 or 448x448)
     ▼
┌─────────────┐
│ Vision      │  ← DINOv2 / SigLIP / PaliGemma vision encoder
│ Encoder     │
└────┬────────┘
     │ Visual tokens
     ▼
┌─────────────┐
│ LLM         │  ← Language model backbone + LoRA
│ Backbone    │  ← Task instruction as text tokens
│ + LoRA      │
└────┬────────┘
     │ Latent representation
     ▼
┌─────────────┐
│ Action      │  ← Flow matching / diffusion / AR head
│ Expert      │
└────┬────────┘
     │ Action chunk (50 steps)
     ▼
[joint_1, joint_2, ..., joint_n] × 50 timesteps
```

### 5. Training Cluster

#### 5.1 SFT Engine (LoRA Fine-Tuning)

- **Framework:** OpenPI (for pi0.5) / HuggingFace PEFT (for other models)
- **Data Format:** LeRobot v2 (standardized robot demonstration format)
- **Training:** LoRA-only, base model frozen, FSDP for multi-GPU
- **Output:** LoRA adapter checkpoint → uploaded to LoRA cache

**Unified API:**
```python
# Inference and training share the same forward pass
# Training just adds: loss computation + backward + optimizer step
actions = model.forward(frame, task_text, lora_id)        # inference
loss = model.forward_with_loss(frame, task_text, label, lora_id)  # training
```

#### 5.2 RL Engine

- **Algorithms:** PPO, GRPO, DPO
- **Sim Environments:** ManiSkill, LIBERO (for offline RL / sim-to-real)
- **Reward Model:** VLM-as-Judge — use a VLM to evaluate task success from video
- **Online RL:** Stream real robot experience back for online training

#### 5.3 Data Manager

- **LeRobot v2 Format:** Standardized storage for robot demonstrations
- **Privacy:** Video frames encrypted, per-customer isolation
- **Versioning:** Dataset versioning for reproducible training
- **Augmentation:** Built-in data augmentation (crop, color jitter, temporal)

### 6. Infrastructure

#### 6.1 GPU Fleet

- **Primary:** NVIDIA A100 80GB (inference + training)
- **Cost-optimized:** NVIDIA A6000 / L40S (inference-only, lower cost)
- **Future:** H100 / B200 for next-gen models

#### 6.2 Networking

- **Ingress:** gRPC over TLS, global edge PoPs for low latency
- **Internal:** RDMA / NVLink for multi-GPU training
- **Egress:** Action chunks are tiny (~1KB), negligible egress cost

#### 6.3 Storage

- **Hot:** GPU VRAM (LoRA adapters, model weights)
- **Warm:** NVMe SSD (LoRA cache, training checkpoints)
- **Cold:** S3-compatible object storage (datasets, archived models)

#### 6.4 Monitoring

- **Metrics:** Prometheus + Grafana (latency, throughput, GPU utilization)
- **Logging:** Structured logs with request tracing
- **Alerting:** PagerDuty integration for SLA violations

### 7. Security

- **Authentication:** API keys + short-lived JWT tokens
- **Authorization:** Per-customer LoRA isolation, RBAC for team accounts
- **Encryption:** TLS 1.3 in transit, AES-256 at rest
- **Isolation:** Customer LoRA weights never co-located in same memory page
- **Compliance:** SOC2 Type II (P2 milestone)

### 8. Scalability

**Horizontal Scaling:**
- Add GPU instances to handle more concurrent sessions
- Stateless gateway layer scales independently
- LoRA placement optimization across GPU fleet

**Vertical Scaling:**
- Larger GPUs (A100 → H100) for bigger models or more concurrent LoRAs
- Quantization (FP16 → INT8 → FP8) to fit more adapters per GPU

**Statistical Multiplexing:**
- Average VLA load is ~40% (robots pause, think, move)
- 12 robots per A100 at 10Hz with statistical multiplexing
- Time-zone arbitrage: US daytime + Asia nighttime = same GPU pool
