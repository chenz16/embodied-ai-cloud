"use client";

import { motion } from "framer-motion";
import { Layers, Upload, GitBranch, FlaskConical, Zap, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const benefits = [
  {
    icon: Upload,
    title: "Upload & Deploy in Seconds",
    description: "Upload your LoRA adapter and it's live instantly. Hot-loaded into GPU VRAM with zero downtime.",
  },
  {
    icon: GitBranch,
    title: "Version Control & Rollback",
    description: "Every LoRA version tracked. Roll back to any previous version with a single click.",
  },
  {
    icon: FlaskConical,
    title: "A/B Test Your Models",
    description: "Run multiple LoRA variants side-by-side. Compare performance with real robot tasks.",
  },
  {
    icon: Zap,
    title: "Zero Switching Cost",
    description: "SGMV kernel selects the correct LoRA per-request. 2000+ adapters per GPU, ~2ms overhead.",
  },
];

const codeExample = `from embodied_brain import Client

client = Client(api_key="your_key")

# Deploy your own LoRA — your model, your parameters
session = client.create_session(
    model="pi05",                      # shared base model
    lora_id="my_custom_lora_v3",       # YOUR fine-tuned adapter
    robot_profile="unitree_g1",
    task="pick up the red cup"
)

# Your robot now runs with YOUR model weights
while running:
    actions = session.run(camera.capture())
    robot.execute(actions)

# Train a new LoRA entirely in the cloud
job = client.train(
    base_model="pi05",
    dataset="my_demonstrations",
    method="sft",          # or "rl"
    lora_rank=16,
    epochs=50
)
# job.lora_id → deploy immediately`;

export function LoRA() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background accent glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.04] blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="text-center mb-6">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
            <Layers size={12} />
            Core Feature
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Run with{" "}
            <span className="gradient-text">Your Own Model</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Fine-tune a LoRA adapter on your data, deploy it to our cloud in seconds.
            Your model parameters, our infrastructure. Full control, zero ops.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className="rounded-xl border border-border/50 bg-card/30 p-5 hover:border-primary/30 transition-colors"
            >
              <div className="mb-3 inline-flex items-center justify-center rounded-lg bg-primary/10 p-2">
                <b.icon size={18} className="text-primary" />
              </div>
              <h3 className="font-semibold text-sm mb-1.5">{b.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{b.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Code example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-2xl border border-border/50 bg-card/30 overflow-hidden glow"
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-secondary/30">
            <div className="h-3 w-3 rounded-full bg-destructive/60" />
            <div className="h-3 w-3 rounded-full bg-chart-4/60" />
            <div className="h-3 w-3 rounded-full bg-accent/60" />
            <span className="ml-2 text-xs text-muted-foreground font-mono">
              deploy_your_lora.py
            </span>
          </div>
          <pre className="p-6 text-xs sm:text-sm font-mono leading-relaxed text-muted-foreground overflow-x-auto">
            <code>{codeExample}</code>
          </pre>
        </motion.div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <a
            href="#waitlist"
            className={cn(buttonVariants({ size: "lg" }), "gap-2 text-base px-8")}
          >
            Start Deploying Your LoRA <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
