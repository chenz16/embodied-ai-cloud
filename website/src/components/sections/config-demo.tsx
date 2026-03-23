"use client";

import { motion } from "framer-motion";

// Helper for syntax highlighting
const Key = ({ children }: { children: React.ReactNode }) => <span className="text-primary">{children}</span>;
const ValStr = ({ children }: { children: React.ReactNode }) => <span className="text-accent">{children}</span>;
const ValNum = ({ children }: { children: React.ReactNode }) => <span className="text-chart-4">{children}</span>;
const ValBool = ({ children }: { children: React.ReactNode }) => <span className="text-chart-2">{children}</span>;
const Comment = ({ children }: { children: React.ReactNode }) => <span className="text-muted-foreground/60">{children}</span>;

const HighlightedYaml = () => (
  <code>
    <Key>robot:</Key>{"\n"}
    {"  "}<Key>name:</Key> <ValStr>unitree_g1</ValStr>{"\n"}
    {"  "}<Key>type:</Key> <ValStr>humanoid</ValStr>{"\n"}
    {"  "}<Key>dof:</Key> <ValNum>23</ValNum>{"\n"}
    {"\n"}
    <Key>joints:</Key>{"\n"}
    {"  "}<Key>left_arm:</Key>{"\n"}
    {"    - "}<Key>name:</Key> <ValStr>left_shoulder_pitch</ValStr>{"\n"}
    {"      "}<Key>index:</Key> <ValNum>0</ValNum>{"\n"}
    {"      "}<Key>range:</Key> [<ValNum>-3.14</ValNum>, <ValNum>3.14</ValNum>]{"\n"}
    {"      "}<Key>max_velocity:</Key> <ValNum>2.0</ValNum>{"\n"}
    {"    - "}<Key>name:</Key> <ValStr>left_shoulder_roll</ValStr>{"\n"}
    {"      "}<Key>index:</Key> <ValNum>1</ValNum>{"\n"}
    {"      "}<Key>range:</Key> [<ValNum>-1.57</ValNum>, <ValNum>1.57</ValNum>]{"\n"}
    {"      "}<Key>max_velocity:</Key> <ValNum>2.0</ValNum>{"\n"}
    {"    - "}<Key>name:</Key> <ValStr>left_elbow</ValStr>{"\n"}
    {"      "}<Key>index:</Key> <ValNum>2</ValNum>{"\n"}
    {"      "}<Key>range:</Key> [<ValNum>-2.61</ValNum>, <ValNum>2.61</ValNum>]{"\n"}
    {"      "}<Key>max_velocity:</Key> <ValNum>2.0</ValNum>{"\n"}
    {"\n"}
    <Key>action_space:</Key>{"\n"}
    {"  "}<Key>type:</Key> <ValStr>joint_position</ValStr>{"\n"}
    {"  "}<Key>frequency:</Key> <ValNum>10</ValNum>        <Comment># Hz</Comment>{"\n"}
    {"  "}<Key>chunk_size:</Key> <ValNum>50</ValNum>       <Comment># predict 50 steps</Comment>{"\n"}
    {"\n"}
    <Key>model:</Key>{"\n"}
    {"  "}<Key>base:</Key> <ValStr>pi05</ValStr>{"\n"}
    {"  "}<Key>lora_id:</Key> <ValStr>my_g1_lora_v2</ValStr>{"\n"}
    {"\n"}
    <Key>safety:</Key>{"\n"}
    {"  "}<Key>joint_limits:</Key> <ValBool>true</ValBool>{"\n"}
    {"  "}<Key>force_limit:</Key> <ValNum>50</ValNum>      <Comment># N</Comment>{"\n"}
    {"  "}<Key>collision_detection:</Key> <ValBool>true</ValBool>{"\n"}
    {"  "}<Key>emergency_stop_latency:</Key> <ValNum>50</ValNum>  <Comment># ms</Comment>
  </code>
);

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
              <HighlightedYaml />
            </pre>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
