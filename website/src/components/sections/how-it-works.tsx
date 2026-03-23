"use client";

import { motion } from "framer-motion";
import { MousePointerClick, Upload, Rocket, RefreshCw } from "lucide-react";

const steps = [
  {
    icon: MousePointerClick,
    step: "01",
    title: "Choose Model & Configure Robot",
    description:
      "Select a base VLA/VLM model. Pick a built-in robot profile or upload your URDF. Define joint mapping in YAML.",
  },
  {
    icon: Upload,
    step: "02",
    title: "Upload Data & Train in Cloud",
    description:
      "Upload demonstration data in LeRobot v2 format. Cloud GPUs fine-tune a LoRA adapter for your task. No local GPU needed.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "One-Click Deploy & Infer at 10Hz",
    description:
      "Trained LoRA deploys directly to inference cluster. Your robot streams camera frames and receives action chunks in real-time.",
  },
  {
    icon: RefreshCw,
    step: "04",
    title: "Iterate & Improve",
    description:
      "Collect new data from robot operation. Re-train, A/B test, and deploy updated LoRA. Continuous improvement loop.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 relative section-alt">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            How It{" "}
            <span className="gradient-text">Works</span>
          </h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-accent/30 to-transparent hidden md:block" />

          <div className="space-y-12">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex gap-6 md:gap-10"
              >
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <s.icon size={20} className="text-primary" />
                  </div>
                </div>
                <div className="pt-1">
                  <div className="text-xs font-mono text-primary mb-1">
                    Step {s.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
                    {s.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
