"use client";

import React, { useRef, useState } from "react";
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

function FeatureCard({ f, i }: { f: typeof features[0], i: number }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: i * 0.08 }}
      className="relative group rounded-2xl border border-border/50 bg-card/40 p-6 overflow-hidden transition-colors hover:border-border/80"
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-0"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`,
        }}
      />
      <div className="relative z-10">
        <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-primary/10 p-2.5 transition-colors group-hover:bg-primary/20">
          <f.icon size={22} className="text-primary" />
        </div>
        <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {f.description}
        </p>
      </div>
    </motion.div>
  );
}

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
            <FeatureCard key={f.title} f={f} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
