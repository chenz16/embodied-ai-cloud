# Product Requirements Document (PRD)

## Embodied Brain Cloud

### 1. Overview

**Product Name:** Embodied Brain Cloud
**Vision:** Cloud-hosted brain for embodied AI — making every robot intelligent with just a WiFi connection.

**One-liner:** Multi-tenant VLA/VLM inference serving with shared base models and per-robot LoRA adapters.

### 2. Problem Statement

Current embodied AI deployment requires expensive edge GPUs (Jetson Orin ~$1,000) on every robot, leading to:
- High hardware cost per robot unit
- High power consumption (60-80W) reducing battery life to 2-3 hours
- Difficult model updates (manual reflash)
- No multi-tenant capability — each robot needs its own full model
- Wasted GPU cycles (robots are idle most of the time)

### 3. Solution

A cloud inference platform that serves robot VLA models at 10Hz real-time:
- **Shared base model** (e.g., pi0.5, OpenVLA) hosted on cloud GPU
- **Per-robot LoRA adapters** loaded in GPU memory simultaneously
- **SGMV kernel** selects correct LoRA per-request with zero switching cost
- One A100 serves 5-12 robots instead of one

### 4. Target Users

| Persona | Description | Pain Point |
|---------|-------------|------------|
| Robotics Startup | Building manipulation robots, <50 units | Cannot afford $1K GPU per robot |
| Research Lab | Academic VLA research, needs fast iteration | Model update cycle too slow |
| Robot Fleet Operator | Managing 100+ robots in warehouse/retail | Per-unit cost and power budget |
| Hobbyist / Maker | Building personal robots with off-the-shelf parts | No access to ML infrastructure |

### 5. Core Features (MVP — P0)

#### 5.1 Multi-Tenant LoRA Serving
- Shared base model (W_0) frozen on GPU
- Customer LoRAs pre-loaded into adapter pool
- S-LoRA/Punica SGMV kernel: 2000+ adapters per GPU, ~2ms overhead
- Three-tier cache: Hot (GPU VRAM) → Warm (CPU) → Cold (S3)

#### 5.2 Real-Time Inference API
- gRPC streaming endpoint: `run(frame) → action_chunk`
- H.264 video frame input (hardware decoded on server via NVDEC)
- Action chunk output: 50 steps at 10Hz (5 seconds of actions)
- Target latency: < 100ms end-to-end

#### 5.3 Client SDK
- H.264 hardware encode (any SoC, no GPU needed)
- Action chunk buffer: 500ms-1s WiFi dropout immunity
- Built-in joint adapters: Franka, UR5, ALOHA, Unitree G1
- Custom robot support via URDF upload
- Local safety layer: joint limits, force bounds, collision detection

#### 5.4 Web Console
- Dashboard: active sessions, latency metrics, usage
- LoRA management: upload, version, A/B test
- Billing and usage tracking

### 6. Features (P1 — LoRA + Adapter)

#### 6.1 SFT Training Pipeline
- Upload demonstration data (LeRobot v2 format)
- LoRA fine-tuning via OpenPI / HuggingFace
- FSDP distributed training for larger datasets
- Training status monitoring and loss curves

#### 6.2 Joint Adapter Generator
- Upload URDF → auto-generate joint mapping
- Action space normalization per robot morphology

#### 6.3 Video Codec SDK
- Optimized H.264/H.265 encoding profiles for VLA
- Adaptive resolution: 224x224 to 448x448
- Bandwidth estimation and auto-adjustment

### 7. Features (P2 — Full Training)

#### 7.1 RL Engine
- PPO / GRPO / DPO training
- Sim environment integration (ManiSkill, LIBERO)
- VLM-as-Judge reward model
- Online RL with real robot data

#### 7.2 Quantization Toolkit
- INT8 / FP8 quantization for faster inference
- Accuracy validation before deployment
- A/B testing framework

### 8. Features (P3 — Scale)

- Multi-region deployment
- Enterprise VPC / private cloud
- LoRA marketplace (share/sell adapters)
- Edge-cloud hybrid mode (fallback to local model)

### 9. Supported Models

| Model | Params | Architecture | Speed | LoRA Support |
|-------|--------|-------------|-------|-------------|
| pi0.5 | 3B | PaliGemma + Flow Matching | ~10Hz (A100) | OpenPI native |
| OpenVLA-OFT | 7B | Llama2 + DINOv2 + SigLIP | ~130Hz (optimized) | HF LoRA |
| GR00T N1.5 | 3B | VLM + Diffusion Transformer | ~15Hz | Supported |
| SmolVLA | 450M | SmolVLM2 + distillation | >30Hz (4090) | Limited |
| RDT-1B | 1.2B | Diffusion Transformer | ~10Hz | Supported |
| DiffusionVLA | 2B | AR Reasoning + Diffusion | 82Hz (A6000) | Supported |

### 10. Network Requirements

| Resolution | Frame Rate | Bandwidth | Network |
|-----------|-----------|-----------|---------|
| 224x224 | 10Hz | 0.5 Mbps | 3G works |
| 448x448 | 10Hz | 2 Mbps | 4G LTE works |
| 448x448 | 30Hz | 6 Mbps | 5G / WiFi |

- Action chunk buffer absorbs WiFi jitter (P99 < 200ms covered)
- Adaptive Hz: auto-drops 10→5Hz when network degrades
- Graceful degradation: local safety controller takes over on disconnect

### 11. Economics

#### Customer Pricing
| Plan | Price | Included |
|------|-------|----------|
| Starter | $100/mo | 4hr/day inference, 1 LoRA slot |
| Pro | $300/mo | 12hr/day, 5 LoRA slots, training credits |
| Enterprise | Custom | Dedicated GPU, SLA, VPC |

#### Unit Economics (at scale)
- 40% average VLA load + statistical multiplexing → 12 robots per A100
- GPU cost per robot: ~$17/mo → **83% gross margin** at $100/mo
- Time-zone arbitrage: US day + Asia night = same GPU
- 10,000 robots = token throughput of a 30M-user LLM chatbot

### 12. Technical Constraints

- **Latency budget:** < 100ms cloud round-trip (camera → action)
- **Reliability:** 99.9% uptime SLA (with local safety fallback)
- **Security:** Customer LoRA weights encrypted at rest and in transit
- **Privacy:** Robot video frames processed in-memory only, never stored (unless training)
- **Compliance:** SOC2 Type II (P2 milestone)

### 13. Success Metrics

| Metric | P0 Target | P1 Target |
|--------|-----------|-----------|
| Inference latency (P50) | < 80ms | < 60ms |
| Inference latency (P99) | < 150ms | < 120ms |
| Serving throughput | 5 robots/GPU | 12 robots/GPU |
| LoRA switching overhead | < 5ms | < 2ms |
| Monthly active robots | 10 (alpha) | 100 |
| Customer NPS | > 40 | > 50 |

### 14. Roadmap

| Phase | Timeline | Key Deliverables |
|-------|----------|-----------------|
| P0 — MVP | 0-3 months | pi0.5 + OpenVLA serving, single-instance multi-tenant LoRA, gRPC streaming, 3 robot profiles |
| P1 — LoRA + Adapter | 3-6 months | SFT training pipeline, data upload, joint adapter generator, video codec SDK, billing |
| P2 — Full Training | 6-12 months | RL engine (PPO/GRPO), sim validation, quantization, A/B testing |
| P3 — Scale | 12-18 months | Multi-region, Enterprise VPC, LoRA marketplace, edge-cloud hybrid |
