"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const models = [
  {
    name: "pi0 / pi0.5",
    org: "Physical Intelligence",
    params: "3B",
    arch: "PaliGemma + Flow Matching",
    speed: "~10Hz (A100)",
    lora: "OpenPI Native",
    loraLevel: "full",
    tags: ["manipulation", "bimanual"],
  },
  {
    name: "OpenVLA / OFT",
    org: "UC Berkeley",
    params: "7B",
    arch: "Llama2 + DINOv2 + SigLIP",
    speed: "~130Hz (optimized)",
    lora: "HuggingFace LoRA",
    loraLevel: "full",
    tags: ["manipulation", "generalist"],
  },
  {
    name: "GR00T N1 / N1.5",
    org: "NVIDIA",
    params: "2-3B",
    arch: "Eagle VLM + DiT",
    speed: "~15Hz",
    lora: "Supported",
    loraLevel: "full",
    tags: ["humanoid", "manipulation"],
  },
  {
    name: "SmolVLA",
    org: "HuggingFace",
    params: "450M",
    arch: "SmolVLM2 + Distillation",
    speed: ">30Hz (4090)",
    lora: "Limited",
    loraLevel: "partial",
    tags: ["lightweight", "edge-friendly"],
  },
  {
    name: "RDT-1B",
    org: "Tsinghua University",
    params: "1.2B",
    arch: "Diffusion Transformer",
    speed: "~10Hz",
    lora: "Supported",
    loraLevel: "full",
    tags: ["bimanual", "dexterous"],
  },
  {
    name: "DiffusionVLA",
    org: "—",
    params: "2B",
    arch: "AR Reasoning + Diffusion",
    speed: "82Hz (A6000)",
    lora: "Supported",
    loraLevel: "full",
    tags: ["fast", "reasoning"],
  },
  {
    name: "CogACT",
    org: "Tsinghua University",
    params: "—",
    arch: "CogVLM + Action Transformer",
    speed: "~10Hz",
    lora: "Supported",
    loraLevel: "full",
    tags: ["manipulation", "cognitive"],
  },
  {
    name: "Octo",
    org: "UC Berkeley",
    params: "93M",
    arch: "Transformer + Diffusion Head",
    speed: "~15Hz",
    lora: "Supported",
    loraLevel: "full",
    tags: ["lightweight", "generalist"],
  },
  {
    name: "HPT",
    org: "MIT",
    params: "—",
    arch: "Heterogeneous Pre-trained Transformer",
    speed: "~10Hz",
    lora: "Supported",
    loraLevel: "full",
    tags: ["cross-embodiment"],
  },
];

export function Models() {
  return (
    <section id="models" className="py-32 relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Every Open-Source Model,{" "}
            <span className="gradient-text">One Platform</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            All mainstream VLA/VLM models ready to deploy. New models added continuously.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {models.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="rounded-xl border border-border/50 bg-card/30 p-5 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold">{m.name}</h3>
                  <p className="text-xs text-muted-foreground">{m.org}</p>
                </div>
                <Badge
                  variant={m.loraLevel === "full" ? "default" : "secondary"}
                  className="text-xs shrink-0"
                >
                  {m.lora}
                </Badge>
              </div>

              <div className="space-y-1.5 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Parameters</span>
                  <span className="text-foreground">{m.params}</span>
                </div>
                <div className="flex justify-between">
                  <span>Architecture</span>
                  <span className="text-foreground text-right max-w-[60%]">{m.arch}</span>
                </div>
                <div className="flex justify-between">
                  <span>Speed</span>
                  <span className="text-accent">{m.speed}</span>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {m.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-secondary/60 px-2 py-0.5 text-xs text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Continuously updated — new models supported on day one.
        </p>
      </div>
    </section>
  );
}
