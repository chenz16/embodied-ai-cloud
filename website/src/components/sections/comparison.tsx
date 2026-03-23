"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const rows = [
  {
    label: "Hardware Cost / Robot",
    edge: "~$1,000 (Jetson Orin)",
    cloud: "~$15 (WiFi + encoder)",
    cloudWins: true,
  },
  {
    label: "Power Consumption",
    edge: "60-80W (GPU + cooling)",
    cloud: "12-20W (WiFi + MCU)",
    cloudWins: true,
  },
  {
    label: "Battery Life (1.5kWh)",
    edge: "2-3 hours",
    cloud: "5-8 hours",
    cloudWins: true,
  },
  {
    label: "Model Updates",
    edge: "Manual reflash",
    cloud: "Instant (swap LoRA ID)",
    cloudWins: true,
  },
  {
    label: "Multi-tenant LoRA",
    edge: "N/A",
    cloud: "2000+ adapters / GPU",
    cloudWins: true,
  },
  {
    label: "Monthly Cost",
    edge: "$0 (CapEx amortized)",
    cloud: "~$100/mo (Starter plan)",
    cloudWins: false,
  },
  {
    label: "Network Dependency",
    edge: "None",
    cloud: "WiFi / 4G LTE required",
    cloudWins: false,
  },
];

export function Comparison() {
  return (
    <section className="py-32 relative section-alt">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Why Cloud,{" "}
            <span className="gradient-text">Not Edge?</span>
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-border/50 overflow-hidden"
        >
          <div className="grid grid-cols-3 bg-secondary/50 text-sm font-semibold">
            <div className="p-4" />
            <div className="p-4 text-center">Edge GPU</div>
            <div className="p-4 text-center gradient-text">Cloud (Ours)</div>
          </div>
          {rows.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-3 text-sm ${
                i % 2 === 0 ? "bg-card/30" : "bg-card/10"
              }`}
            >
              <div className="p-4 font-medium text-muted-foreground">
                {row.label}
              </div>
              <div className="p-4 text-center flex items-center justify-center gap-1.5">
                {!row.cloudWins && (
                  <Check size={14} className="text-accent shrink-0" />
                )}
                {row.edge}
              </div>
              <div className="p-4 text-center flex items-center justify-center gap-1.5">
                {row.cloudWins && (
                  <Check size={14} className="text-accent shrink-0" />
                )}
                {row.cloud}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
