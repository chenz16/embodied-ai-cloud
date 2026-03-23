import { Github, Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-lg font-bold">
              <span className="gradient-text">EBC</span>
            </span>
            <p className="mt-1 text-xs text-muted-foreground">
              Cloud-hosted brain for embodied AI.
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#models" className="hover:text-foreground transition-colors">
              Models
            </a>
            <a href="#robots" className="hover:text-foreground transition-colors">
              Robots
            </a>
            <a href="#pricing" className="hover:text-foreground transition-colors">
              Pricing
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github size={18} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Twitter size={18} />
            </a>
            <a
              href="mailto:hello@embodiedbrain.cloud"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/30 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Embodied Brain Cloud. Apache License 2.0.
        </div>
      </div>
    </footer>
  );
}
