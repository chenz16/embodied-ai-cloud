"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

type Robot = {
  name: string;
  maker: string;
  dof: string;
  desc: string;
};

const humanoids: Robot[] = [
  { name: "G1", maker: "Unitree", dof: "23-43 DOF", desc: "Lightweight humanoid with force control" },
  { name: "H1", maker: "Unitree", dof: "19 DOF", desc: "Full-size humanoid platform" },
  { name: "A2 Series", maker: "AgiBOT / Zhiyuan", dof: "42+ DOF", desc: "Dexterous hands + dual arm" },
  { name: "GR-1 / GR-2", maker: "Fourier", dof: "40+ DOF", desc: "General-purpose humanoid" },
  { name: "Walker S", maker: "UBTECH", dof: "41 DOF", desc: "Industrial humanoid" },
  { name: "Galbot", maker: "Galaxy Robot", dof: "Dual-arm mobile", desc: "Wheeled base + dual arm" },
];

const arms: Robot[] = [
  { name: "Franka Panda / FR3", maker: "Franka Robotics", dof: "7 DOF", desc: "Research benchmark, force control" },
  { name: "UR5e / UR10e", maker: "Universal Robots", dof: "6 DOF", desc: "Industrial collaborative arm" },
  { name: "ALOHA", maker: "Stanford / Google", dof: "Dual 7 DOF", desc: "Low-cost bimanual teleoperation" },
  { name: "RM65 / RM75", maker: "Realman", dof: "6-7 DOF", desc: "Ultra-lightweight cobot" },
  { name: "JAKA Zu Series", maker: "JAKA Robotics", dof: "6-7 DOF", desc: "Collaborative arm" },
  { name: "COBOT Magic", maker: "Agilex", dof: "6-7 DOF", desc: "Mobile manipulation platform" },
];

const mobile: Robot[] = [
  { name: "Go2 / B2", maker: "Unitree", dof: "Quadruped", desc: "Robot dog platform" },
  { name: "Scout / Hunter", maker: "Agilex", dof: "Mobile base", desc: "Mobile chassis platform" },
];

function RobotCategory({ title, badge, robots }: { title: string; badge: string; robots: Robot[] }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <Badge variant="outline" className="text-xs">{badge}</Badge>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {robots.map((r) => (
          <div
            key={r.name}
            className="rounded-xl border border-border/40 bg-card/20 p-4 hover:border-primary/20 transition-colors"
          >
            <div className="flex items-start justify-between">
              <h4 className="font-medium text-sm">{r.name}</h4>
              <span className="text-xs text-accent font-mono">{r.dof}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{r.maker}</p>
            <p className="text-xs text-muted-foreground mt-2">{r.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Robots() {
  return (
    <section id="robots" className="py-32 relative section-alt">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Mainstream Robots,{" "}
            <span className="gradient-text">Auto-Adapted</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Built-in joint mapping for popular robot platforms. Custom robots supported via URDF upload.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <RobotCategory title="Humanoid" badge="Full-body" robots={humanoids} />
          <RobotCategory title="Robot Arms & Bimanual" badge="Manipulation" robots={arms} />
          <RobotCategory title="Quadruped & Mobile" badge="Locomotion" robots={mobile} />
        </motion.div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-secondary/30 px-5 py-2 text-sm text-muted-foreground">
            Not on the list? Upload your URDF to auto-generate an adapter.
          </div>
        </div>
      </div>
    </section>
  );
}
