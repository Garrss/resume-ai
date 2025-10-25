import React from "react";
import Link from "next/link";
import { Github, Mail, ExternalLink } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full py-8 bg-transparent border-t border-neutral-200/50 dark:border-neutral-800/50 mt-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-6">
          {/* Brand Section */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-lg font-semibold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Resu<span className="text-primary">my</span> 
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              AI-powered resume optimization and career guidance platform. 
              Build better resumes, discover opportunities, and advance your career.
            </p>
          </div>

          {/* Links Section */}
          <div className="flex flex-col sm:flex-row items-center gap-8">
            {/* Legal Links */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Link 
                href="/privacy" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1"
              >
                Terms of Service
              </Link>
              <Link 
                href="/contact" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1"
              >
                Contact
              </Link>
            </div>

            {/* Social & External Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-all duration-200"
                aria-label="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="mailto:support@resumyai.com"
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-all duration-200"
                aria-label="Contact Support"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-neutral-200/30 dark:border-neutral-800/30">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {year} Resumy. All rights reserved.
            </p>
            
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                Built with
              </span>
              <div className="w-1 h-1 bg-primary rounded-full animate-pulse"></div>
              <span className="text-xs text-muted-foreground">
                for modern professionals
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}