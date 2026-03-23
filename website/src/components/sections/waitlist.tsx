"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, CheckCircle } from "lucide-react";

export function Waitlist() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: integrate with Supabase / Resend / any backend
    setSubmitted(true);
  }

  return (
    <section id="waitlist" className="py-32 relative">
      <div className="absolute inset-0 radial-fade" />

      <div className="relative z-10 mx-auto max-w-2xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Get{" "}
            <span className="gradient-text">Early Access</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Join the waitlist to be among the first to try Embodied Brain Cloud.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border border-accent/30 bg-accent/5 p-10 text-center"
          >
            <CheckCircle size={48} className="text-accent mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">You&apos;re on the list!</h3>
            <p className="text-muted-foreground text-sm">
              We&apos;ll reach out soon with early access details.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm p-8 space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input id="name" placeholder="Your name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  required
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company / Institution</Label>
                <Input id="company" placeholder="Optional" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="">Select role</option>
                  <option value="founder">Founder / CEO</option>
                  <option value="engineer">Engineer</option>
                  <option value="researcher">Researcher</option>
                  <option value="student">Student</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="robots">Robot Types</Label>
              <Input
                id="robots"
                placeholder="e.g., Unitree G1, Franka, custom arm..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="usecase">Use Case</Label>
              <Textarea
                id="usecase"
                placeholder="Briefly describe what you want to build..."
                rows={3}
              />
            </div>

            <Button type="submit" size="lg" className="w-full gap-2">
              Join Waitlist <ArrowRight size={16} />
            </Button>
          </motion.form>
        )}
      </div>
    </section>
  );
}
