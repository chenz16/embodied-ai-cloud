# Phase 1 需求文档：产品官网

## 目标

搭建 Embodied Brain Cloud 产品官网，向外界清晰传达核心价值主张：**云端机器人大脑，一站式 VLA/VLM 模型服务平台**。

本阶段不涉及后端推理/训练系统的实现，专注于网站本身。

---

## 1. 核心定位

> "AWS Bedrock for Robotics" —— 让任何机器人只需 WiFi 就能拥有云端智能大脑。

网站需要传达的 6 个核心能力：

| # | 能力 | 一句话描述 |
|---|------|-----------|
| 1 | 云端 VLA/VLM Serving | 共享 base model + 每个机器人独立 LoRA，一块 A100 服务 12 台机器人 |
| 2 | 主流开源模型一站式 | pi0.5、OpenVLA、GR00T、SmolVLA、RDT-1B 等一键选用 |
| 3 | 硬件自动适配 | 支持 Unitree、AgiBOT/智元、Franka、UR、ALOHA 等主流机器人，自定义 URDF 配置关节映射 |
| 4 | LoRA 部署 | 上传自己的 LoRA adapter，秒级热加载，支持版本管理和 A/B 测试 |
| 5 | 云上训练 | SFT / RL 训练全在云端完成，上传数据即可微调，无需本地 GPU |
| 6 | 训练部署一体 | 训练完成的 LoRA 直接部署到推理集群，无需导出/转换 |

---

## 2. 网站页面结构

### 2.1 首页 (Landing Page)

**Hero Section**
- 标题：Embodied Brain Cloud / 具身智能云
- 副标题：Cloud-hosted brain for every robot — VLA/VLM inference, training, and deployment in one platform
- 一个简洁的架构动画/示意图：Robot → WiFi → Cloud GPU → Action
- CTA 按钮：Get Early Access / Join Waitlist

**核心价值 Section**
- 6 个 Feature Card，对应上面 6 个核心能力
- 每个 card 带图标 + 标题 + 2-3 句描述

**Why Cloud vs Edge Section**
- 对比表格：Edge GPU (Jetson Orin) vs Cloud（成本、功耗、电池、更新方式）
- 关键数字突出：$15 vs $1000、5-8h vs 2-3h 电池、2000+ LoRA/GPU

**支持的模型 Section**
- 模型列表卡片，展示：

| 模型 | 组织 | 参数量 | 架构 | LoRA 支持 |
|------|------|--------|------|-----------|
| pi0 / pi0.5 | Physical Intelligence | 3B | PaliGemma + Flow Matching | OpenPI 原生 |
| OpenVLA / OpenVLA-OFT | UC Berkeley | 7B | Llama2 + DINOv2 + SigLIP | HuggingFace LoRA |
| GR00T N1 / N1.5 | NVIDIA | 2-3B | Eagle VLM + Diffusion Transformer | 支持 |
| SmolVLA | HuggingFace | 450M | SmolVLM2 + 蒸馏 | 有限支持 |
| RDT-1B | 清华大学 | 1.2B | Diffusion Transformer | 支持 |
| DiffusionVLA | — | 2B | AR Reasoning + Diffusion | 支持 |
| CogACT | 清华大学 | — | CogVLM + Action Transformer | 支持 |
| Octo | UC Berkeley | 93M | Transformer + Diffusion Head | 支持 |
| HPT | MIT | — | Heterogeneous Pre-trained Transformer | 支持 |

- 标注"持续更新，新模型上线第一时间支持"

**支持的机器人硬件 Section**
- 分类展示：

**人形机器人**
| 机器人 | 厂商 | 自由度 | 说明 |
|--------|------|--------|------|
| G1 | Unitree 宇树 | 23-43 DOF | 轻量人形，支持力控 |
| H1 | Unitree 宇树 | 19 DOF | 全尺寸人形 |
| A2 系列 | AgiBOT 智元 | 全身 42+ DOF | 灵巧手 + 双臂 |
| GR-1 / GR-2 | Fourier 傅利叶 | 40+ DOF | 通用人形平台 |
| Walker S | UBTECH 优必选 | 41 DOF | 工业人形 |
| Galbot | 银河通用 | 双臂移动 | 轮式底盘 + 双臂 |

**机械臂 & 双臂**
| 机器人 | 厂商 | 自由度 | 说明 |
|--------|------|--------|------|
| Franka Panda / FR3 | Franka Robotics | 7 DOF | 科研标杆，力控 |
| UR5e / UR10e | Universal Robots | 6 DOF | 工业协作臂 |
| ALOHA / Mobile ALOHA | Stanford / Google | 双臂 14 DOF | 低成本遥操作 |
| RM65 / RM75 | Realman 睿尔曼 | 6-7 DOF | 超轻量协作臂 |
| JAKA Zu 系列 | JAKA 节卡 | 6-7 DOF | 协作臂 |
| Agilex COBOT Magic | Agilex 松灵 | 6-7 DOF | 移动操作平台 |

**四足 & 移动底盘**
| 机器人 | 厂商 | 说明 |
|--------|------|------|
| Go2 / B2 | Unitree 宇树 | 四足机器狗 |
| Agilex Scout / Hunter | Agilex 松灵 | 移动底盘平台 |

- "不在列表中？上传 URDF 自动生成适配器"

**Config 配置演示 Section**
- 展示用户如何通过 YAML/JSON 配置关节映射
- 示例代码片段：

```yaml
robot:
  name: unitree_g1
  type: humanoid
  dof: 23

joints:
  left_arm:
    - name: left_shoulder_pitch
      index: 0
      range: [-3.14, 3.14]
      max_velocity: 2.0
    - name: left_shoulder_roll
      index: 1
      range: [-1.57, 1.57]
      max_velocity: 2.0
    # ...

action_space:
  type: joint_position  # joint_position | joint_velocity | end_effector
  frequency: 10  # Hz
  chunk_size: 50  # 预测 50 步

model:
  base: pi05
  lora_id: my_g1_lora_v2

safety:
  joint_limits: true
  force_limit: 50  # N
  collision_detection: true
  emergency_stop_latency: 50  # ms
```

**经济性 Section**
- 定价方案预览（Starter / Pro / Enterprise）
- 对比图：传统方案 vs 云端方案的 TCO

**How It Works Section**
- 3-4 步流程图：
  1. 选择模型 → 配置机器人 profile
  2. 上传训练数据 → 云端 LoRA 微调
  3. 一键部署 → 实时推理 10Hz
  4. 持续迭代 → 数据回流 → 模型更新

**Footer**
- 公司信息、联系方式
- GitHub 链接
- 文档链接（指向未来的 docs 站）
- 社交媒体

### 2.2 模型库页面 (Models)

- 所有支持模型的详情页
- 每个模型：参数量、架构图、benchmark 数据、适用场景、Quick Start 代码
- 筛选：按任务类型（抓取/导航/双臂）、按模型大小、按速度

### 2.3 机器人适配页面 (Robots)

- 所有支持机器人的详情页
- 每个机器人：规格参数、关节映射示意图、推荐模型、配置模板
- "添加我的机器人"入口 → 引导上传 URDF

### 2.4 文档页面 (Docs)

- Quick Start 教程
- API Reference（预览版，展示接口设计）
- 配置指南：如何写 robot config
- 模型选择指南：什么场景用什么模型

### 2.5 定价页面 (Pricing)

| 方案 | 价格 | 包含内容 |
|------|------|----------|
| Starter | $100/月 | 4h/天推理，1 个 LoRA 槽位，基础训练额度 |
| Pro | $300/月 | 12h/天推理，5 个 LoRA 槽位，高级训练额度 |
| Enterprise | 联系我们 | 专属 GPU，SLA，VPC，定制支持 |

### 2.6 Early Access / Waitlist 页面

- 注册表单：邮箱、公司/机构、机器人类型、使用场景
- 提交后进入 waitlist

---

## 3. 技术选型建议

| 类别 | 方案 | 理由 |
|------|------|------|
| 框架 | Next.js (App Router) | SSR/SSG、SEO 友好、React 生态 |
| 样式 | Tailwind CSS | 快速迭代、响应式 |
| UI 组件 | shadcn/ui | 高质量、可定制、不臃肿 |
| 动画 | Framer Motion | 流畅的 scroll 动画和交互 |
| 部署 | Vercel | Next.js 原生支持、全球 CDN |
| CMS（可选） | MDX | 模型/机器人详情页用 MDX 管理 |
| 表单后端 | Resend / Supabase | waitlist 邮件收集 |
| 分析 | Plausible / PostHog | 隐私友好的访问分析 |

---

## 4. 设计要求

### 4.1 风格
- 科技感 + 专业感，参考 Vercel / Linear / Replicate 的设计语言
- 深色主题为主，亮色为辅
- 代码片段突出展示（开发者友好）

### 4.2 响应式
- Desktop / Tablet / Mobile 三端适配
- 移动端优先保证核心信息可读

### 4.3 性能
- Lighthouse 分数 > 90
- 首屏加载 < 2s
- 图片使用 next/image 优化

### 4.4 SEO
- 每个页面独立 meta title / description
- Open Graph / Twitter Card 支持
- 结构化数据（JSON-LD）

---

## 5. 内容优先级

**P0 — 必须有（上线最小集）**
- [ ] Landing Page 完整实现（所有 section）
- [ ] 响应式适配
- [ ] Waitlist 注册功能
- [ ] 基础 SEO

**P1 — 应该有（上线后 1-2 周）**
- [ ] 模型库详情页
- [ ] 机器人适配详情页
- [ ] 文档页面（Quick Start）
- [ ] 定价页面

**P2 — 锦上添花**
- [ ] 交互式 config 编辑器（在线编辑 robot YAML）
- [ ] 模型对比工具（选 2-3 个模型对比 benchmark）
- [ ] 暗色/亮色主题切换
- [ ] 多语言（中/英）

---

## 6. Waitlist 数据收集

注册表单字段：

| 字段 | 必填 | 类型 |
|------|------|------|
| Email | 是 | email |
| 姓名 | 是 | text |
| 公司/机构 | 否 | text |
| 角色 | 否 | select: 创始人/工程师/研究员/学生/其他 |
| 机器人类型 | 否 | multi-select: 人形/机械臂/四足/移动底盘/其他 |
| 使用场景 | 否 | textarea |
| 如何得知我们 | 否 | select: GitHub/Twitter/朋友推荐/搜索/其他 |

---

## 7. 成功指标

| 指标 | 目标 |
|------|------|
| 上线时间 | 2 周内完成 P0 |
| Waitlist 注册 | 上线首月 200+ |
| 页面跳出率 | < 50% |
| 平均停留时间 | > 2 分钟 |
| GitHub star | 上线首月 500+（如开源） |
