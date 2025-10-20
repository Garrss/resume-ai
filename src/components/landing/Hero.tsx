// ...existing code...
import { CalendarIcon, MicIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import UploadCV from "@/components/landing/UploadCV";
import React from "react";

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* GRID BG  */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/5 to-primary/5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20"></div>
      </div>

      {/* GRADIENT ORBS */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-r from-primary/15 to-primary/5 rounded-full blur-3xl" />

      <div className="relative z-10 w-full px-6">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-10">

          {/* HERO TEXT */}
          <div className="space-y-8">
            {/* BADGE */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full border border-primary/20 backdrop-blur-sm">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-primary">
                AI-Powered Resume Assistant
              </span>
            </div>

            {/* MAIN HEADING */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                Build a better
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                resume instantly
              </span>
              <br />
              <span className="bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                with AI suggestions
              </span>
            </h1>

            {/* SUBTITLE */}
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl font-medium mx-auto">
              Upload your CV, get automated improvements, tailored bullet points,
              and job-specific phrasing — fast and simple.
            </p>
          </div>

          {/* UPLOAD CARD (Now Below Text, Centered) */}
          <div className="w-[800px] bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl border">
  <UploadCV />
  

          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
// ...existing code...
