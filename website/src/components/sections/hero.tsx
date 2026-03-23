"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Cpu, Wifi, Zap } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 radial-fade" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-24 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/50 px-4 py-1.5 text-xs text-muted-foreground">
            <Zap size={12} className="text-accent" />
            AWS Bedrock for Robotics
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
            Cloud-Hosted Brain
            <br />
            <span className="gradient-text">for Every Robot</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            One-stop VLA/VLM inference, training, and deployment platform.
            Turn any robot into an intelligent agent with just a WiFi connection.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#waitlist"
              className={cn(buttonVariants({ size: "lg" }), "gap-2 text-base px-8")}
            >
              Get Early Access <ArrowRight size={16} />
            </a>
            <a
              href="#features"
              className={cn(buttonVariants({ size: "lg", variant: "outline" }), "gap-2 text-base px-8")}
            >
              Learn More
            </a>
          </div>
        </motion.div>

        {/* Architecture diagram */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 glow rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm p-8 font-mono text-sm"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 text-muted-foreground">
            <div className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border/40 bg-secondary/30 min-w-[180px]">
              <Cpu size={24} className="text-primary" />
              <span className="text-foreground font-semibold">Robot</span>
              <span className="text-xs">Camera + WiFi + MCU</span>
              <span className="text-xs text-accent">~$15 hardware</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <Wifi size={20} className="text-primary animate-pulse" />
              <span className="text-xs">H.264 Stream</span>
              <div className="w-24 h-px bg-gradient-to-r from-primary to-accent" />
              <span className="text-xs">Action Chunks</span>
            </div>

            <div className="flex flex-col items-center gap-2 p-4 rounded-xl border border-primary/30 bg-primary/5 min-w-[240px]">
              <div className="flex items-center gap-2">
                <Zap size={24} className="text-accent" />
                <span className="text-foreground font-semibold">Cloud GPU</span>
              </div>
              <span className="text-xs">Shared Base Model (W₀)</span>
              <span className="text-xs">+ 2000 LoRA Adapters</span>
              <span className="text-xs text-accent">1 A100 → 12 robots</span>
            </div>
          </div>
        </motion.div>

        {/* Key numbers */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "$15", label: "Robot Hardware Cost" },
            { value: "10Hz", label: "Real-time Inference" },
            { value: "<100ms", label: "End-to-end Latency" },
            { value: "2000+", label: "LoRA / GPU" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold gradient-text">
                {stat.value}
              </div>
              <div className="mt-1 text-xs sm:text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
