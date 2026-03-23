"use client";

import { motion } from "framer-motion";
import {
  Cloud,
  Layers,
  Settings,
  Upload,
  GraduationCap,
  RefreshCw,
} from "lucide-react";

const features = [
  {
    icon: Cloud,
    title: "Cloud VLA/VLM Serving",
    description:
      "Shared base model on cloud GPU with per-robot LoRA adapters. One A100 serves 12 robots at 10Hz real-time.",
  },
  {
    icon: Layers,
    title: "All Open-Source Models",
    description:
      "pi0.5, OpenVLA, GR00T, SmolVLA, RDT-1B, CogACT and more. One platform, every model, one-click deploy.",
  },
  {
    icon: Settings,
    title: "Hardware Auto-Adapt",
    description:
      "Built-in profiles for Unitree, AgiBOT, Franka, UR, ALOHA. Custom robots via YAML config or URDF upload.",
  },
  {
    icon: Upload,
    title: "LoRA Deploy",
    description:
      "Upload your fine-tuned LoRA adapter. Hot-loaded in seconds. Version control and A/B testing built-in.",
  },
  {
    icon: GraduationCap,
    title: "Cloud Training",
    description:
      "SFT and RL training entirely in the cloud. Upload demonstration data, get a trained LoRA back. No local GPU needed.",
  },
  {
    icon: RefreshCw,
    title: "Train-Deploy Loop",
    description:
      "Training output deploys directly to inference cluster. No export, no conversion. Continuous iteration cycle.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Everything You Need,{" "}
            <span className="gradient-text">In the Cloud</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            From model serving to training to deployment — one platform replaces
            your entire robotics ML infrastructure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group rounded-2xl border border-border/50 bg-card/40 p-6 hover:border-primary/30 hover:bg-card/70 transition-all duration-300"
            >
              <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-primary/10 p-2.5">
                <f.icon size={22} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
