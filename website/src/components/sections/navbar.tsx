"use client";

import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#features", label: "Features" },
  { href: "#models", label: "Models" },
  { href: "#robots", label: "Robots" },
  { href: "#pricing", label: "Pricing" },
  { href: "#how-it-works", label: "How It Works" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#" className="text-lg font-bold tracking-tight">
          <span className="gradient-text">EBC</span>
          <span className="ml-1 text-muted-foreground font-normal text-sm hidden sm:inline">
            Embodied Brain Cloud
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#waitlist"
            className={cn(buttonVariants({ size: "sm" }))}
          >
            Get Early Access
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-muted-foreground"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl px-6 py-4 space-y-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="block text-sm text-muted-foreground hover:text-foreground"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#waitlist"
            className={cn(buttonVariants({ size: "sm" }), "w-full")}
            onClick={() => setOpen(false)}
          >
            Get Early Access
          </a>
        </div>
      )}
    </nav>
  );
}
