"use client";

import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$100",
    period: "/mo",
    description: "For individual developers and small experiments.",
    features: [
      "4 hr/day inference time",
      "1 LoRA adapter slot",
      "Basic training credits (10 GPU-hrs)",
      "3 robot profiles",
      "Community support",
    ],
    cta: "Join Waitlist",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$300",
    period: "/mo",
    description: "For teams building production robots.",
    features: [
      "12 hr/day inference time",
      "5 LoRA adapter slots",
      "Advanced training credits (50 GPU-hrs)",
      "Unlimited robot profiles",
      "A/B testing & version control",
      "Priority support",
    ],
    cta: "Join Waitlist",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For fleets and organizations at scale.",
    features: [
      "Dedicated GPU instances",
      "Unlimited LoRA slots",
      "Unlimited training",
      "99.9% SLA guarantee",
      "VPC / private deployment",
      "Custom model integration",
      "Dedicated support engineer",
    ],
    cta: "Contact Us",
    highlight: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-32 relative">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Simple{" "}
            <span className="gradient-text">Pricing</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Cheaper than a Jetson Orin. Pay only for what you use.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`rounded-2xl border p-6 flex flex-col ${
                plan.highlight
                  ? "border-primary/50 bg-primary/5 glow"
                  : "border-border/50 bg-card/30"
              }`}
            >
              <div className="mb-6">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check size={15} className="text-accent mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#waitlist"
                className={cn(
                  buttonVariants({
                    variant: plan.highlight ? "default" : "outline",
                  }),
                  "w-full"
                )}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
