# Embodied Brain Cloud

**Cloud-hosted brain for embodied AI** — Multi-tenant VLA/VLM inference serving with shared base models and per-robot LoRA adapters. Turn any robot into an intelligent agent with just a WiFi connection.

## What is this?

Embodied Brain Cloud is a cloud inference platform for robot Vision-Language-Action (VLA) models — think "AWS Bedrock for robotics." Instead of strapping an expensive GPU to every robot, we serve the "brain" from the cloud at 10Hz real-time, while the robot only needs a camera, a WiFi module, and a lightweight local controller.

**The core idea:** One GPU hosts a shared base model (e.g., pi0.5, OpenVLA). Multiple customers' LoRA adapters live in GPU memory simultaneously. Per-request, the SGMV kernel selects the correct LoRA — zero switching cost. One A100 serves 5-12 robots instead of one.

```
Robot (client)                          Cloud (server)
┌──────────────┐    H.264 frame     ┌───────────────────────────┐
│ Camera       │ ──────────────────→│ Shared Base Model (W_0)   │
│ H.264 Encode │    + lora_id       │ + LoRA Pool (A1B1..AnBn)  │
│ Local Safety │ ←──────────────────│ → Action Chunk (50 steps) │
│ Joint Control│    action chunk    └───────────────────────────┘
└──────────────┘                     y = xW_0 + xA*B (per-request)
  ~$15 hardware                        ~$0.36/hr shared GPU
```

## Why cloud, not edge?

|                          | Edge (Jetson Orin)           | Cloud (this platform)          |
|--------------------------|------------------------------|--------------------------------|
| Hardware cost per robot  | ~$1,000 GPU module           | ~$15 WiFi + encoder chip       |
| Power consumption        | 60-80W (GPU + cooling)       | 12-20W (WiFi + cameras + MCU)  |
| Battery life (1.5kWh)   | ~2-3 hours                   | ~5-8 hours                     |
| Model updates            | Manual reflash               | Instant (swap LoRA ID)         |
| Multi-tenant LoRA        | N/A                          | 2000+ adapters per GPU         |
| Monthly cost             | $0 (CapEx amortized)         | ~$100/mo (4hr/day plan)        |

## Architecture

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

## Key Features

### Multi-Tenant LoRA Serving
- Shared base model (W_0) frozen on GPU, customer LoRAs pre-loaded into adapter pool
- S-LoRA/Punica SGMV kernel: 2000+ adapters per GPU, ~2ms overhead, 12x throughput
- Three-tier cache: Hot (GPU VRAM, 0ms) → Warm (CPU, ~2ms) → Cold (S3, ~40ms)

### Unified Training + Inference
- Forward pass is identical; training just adds loss + backward + optimizer step
- Two API endpoints: `run(frame) → actions` and `train_step(frame, label) → loss`
- Same GPU pool: inference by day, training by night

### Client SDK
- H.264 hardware encode (any SoC, no GPU needed) → ~2Mbps at 448x448
- Action chunk buffer: 500ms-1s WiFi dropout immunity
- Built-in joint adapters: Franka, UR5, ALOHA, Unitree G1 (or upload URDF)
- Local safety layer: joint limits, force bounds, collision detection

### Network-Friendly Design
- 224x224 @10Hz = 0.5 Mbps (3G works)
- 448x448 @10Hz = 2 Mbps (4G LTE works)
- Action chunk buffer absorbs WiFi jitter (P99 < 200ms covered)
- Adaptive Hz: auto-drops 10→5Hz when network degrades

## Supported Models

| Model        | Params | Architecture                    | Speed            | LoRA          |
|--------------|--------|---------------------------------|------------------|---------------|
| pi0.5        | 3B     | PaliGemma + Flow Matching       | ~10Hz (A100)     | OpenPI native |
| OpenVLA-OFT  | 7B     | Llama2 + DINOv2 + SigLIP        | ~130Hz (optimized)| HF LoRA      |
| GR00T N1.5   | 3B     | VLM + Diffusion Transformer     | ~15Hz            | Supported     |
| SmolVLA      | 450M   | SmolVLM2 + distillation         | >30Hz (4090)     | Limited       |
| RDT-1B       | 1.2B   | Diffusion Transformer           | ~10Hz            | Supported     |
| DiffusionVLA | 2B     | AR Reasoning + Diffusion        | 82Hz (A6000)     | Supported     |

## Quick Start

```python
from embodied_brain import Client

# Connect to platform
client = Client(api_key="your_key")

# Create inference session
session = client.create_session(
    model="pi05",
    lora_id="my_lora_v3",          # pre-uploaded adapter
    robot_profile="franka_panda",   # built-in joint mapping
    task="pick up the red cup"
)

# 10Hz inference loop
while running:
    actions = session.run(camera.capture())  # → 50-step action chunk
    robot.execute(actions)
```

```python
# Training: same API, just add ground truth
for frame, label in demonstration_stream:
    loss = session.train_step(frame, label)  # updates LoRA in-place
    print(f"loss: {loss:.4f}")
```

## Project Structure

```
embodied-brain-cloud/
├── docs/
│   ├── PRD.md                    # Product Requirements Document
│   ├── architecture.md           # Detailed system architecture
│   └── api-reference.md          # API specification
├── server/
│   ├── serving/                  # Inference engine (vLLM + LoRA)
│   │   ├── engine.py             # Multi-tenant serving engine
│   │   ├── lora_manager.py       # Three-tier LoRA cache
│   │   ├── scheduler.py          # Round-robin time-slice scheduler
│   │   └── action_pipeline.py    # Vision → LLM → Action Expert
│   ├── training/                 # SFT + RL training pipelines
│   │   ├── sft_engine.py         # LoRA fine-tuning (OpenPI / HF)
│   │   ├── rl_engine.py          # PPO / GRPO / DPO
│   │   └── data_manager.py       # LeRobot v2 format handler
│   ├── gateway/                  # API gateway + auth + metering
│   └── orchestrator/             # GPU instance lifecycle
├── client/
│   ├── sdk/                      # Python/C++ client SDK
│   │   ├── encoder.py            # H.264 video encoding
│   │   ├── session.py            # gRPC streaming session
│   │   ├── chunk_buffer.py       # Action chunk buffering
│   │   └── safety.py             # Local safety bounds
│   ├── joint_adapters/           # Robot joint mapping profiles
│   │   ├── franka.py
│   │   ├── ur5.py
│   │   ├── aloha.py
│   │   └── urdf_loader.py        # Custom URDF → adapter
│   └── agent/                    # Turnkey agent (plug-and-play)
├── proto/                        # gRPC/protobuf definitions
├── tools/
│   ├── network_check.py          # WiFi/5G quality diagnostic
│   ├── lora_validator.py         # Upload validation
│   └── benchmark.py              # Latency profiler
├── configs/
│   ├── models/                   # Base model configs
│   └── robots/                   # Robot profile configs
├── tests/
├── docker/
├── .github/workflows/
├── LICENSE
└── README.md
```

## Economics

### For customers
- **$100/mo** (4hr/day brain time) — cheaper than a Jetson Orin
- **$0.04/M tokens** — cheaper than any LLM API (VLA tokens are lightweight)
- Save $950/robot hardware + 50W power + cooling system

### For the platform (at scale)
- 40% VLA load + statistical multiplexing → 12 robots per A100
- GPU cost per robot: ~$17/mo → **83% gross margin** at $100/mo
- Time-zone arbitrage: US day robots + Asia night robots = same GPU
- 10,000 robots = token throughput of a 30M-user LLM chatbot

## Roadmap

| Phase              | Timeline    | Focus                                                                                    |
|--------------------|-------------|------------------------------------------------------------------------------------------|
| P0 — MVP           | 0-3 months  | pi0.5 + OpenVLA serving, single-instance multi-tenant LoRA, gRPC streaming, 3 robot profiles |
| P1 — LoRA + Adapter| 3-6 months  | SFT training pipeline, data upload tools, joint adapter generator, video codec SDK, billing |
| P2 — Full Training | 6-12 months | RL engine (PPO/GRPO), sim validation, quantization toolkit, A/B testing                   |
| P3 — Scale         | 12-18 months| Multi-region, Enterprise VPC, LoRA marketplace, edge-cloud hybrid                         |

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

Apache License 2.0 — see [LICENSE](LICENSE) for details.

---

*Cloud-hosted brain for embodied AI. Your robot thinks in the cloud, acts in the real world.*
