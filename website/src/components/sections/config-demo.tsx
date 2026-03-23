"use client";

import { motion } from "framer-motion";

const yamlCode = `robot:
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
    - name: left_elbow
      index: 2
      range: [-2.61, 2.61]
      max_velocity: 2.0

action_space:
  type: joint_position
  frequency: 10        # Hz
  chunk_size: 50       # predict 50 steps

model:
  base: pi05
  lora_id: my_g1_lora_v2

safety:
  joint_limits: true
  force_limit: 50      # N
  collision_detection: true
  emergency_stop_latency: 50  # ms`;

export function ConfigDemo() {
  return (
    <section className="py-32 relative">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Configure with{" "}
              <span className="gradient-text">Simple YAML</span>
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Define your robot&apos;s joint mapping, action space, model selection,
              and safety bounds in a single config file. No boilerplate code needed.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Joint mapping — map model output to your robot's specific DOF",
                "Action space — position, velocity, or end-effector control",
                "Model selection — choose base model + LoRA adapter",
                "Safety bounds — joint limits, force limits, emergency stop",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border/50 bg-card/30 overflow-hidden"
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-secondary/30">
              <div className="h-3 w-3 rounded-full bg-destructive/60" />
              <div className="h-3 w-3 rounded-full bg-chart-4/60" />
              <div className="h-3 w-3 rounded-full bg-accent/60" />
              <span className="ml-2 text-xs text-muted-foreground font-mono">
                robot_config.yaml
              </span>
            </div>
            <pre className="p-5 text-xs font-mono leading-relaxed text-muted-foreground overflow-x-auto">
              <code>{yamlCode}</code>
            </pre>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
