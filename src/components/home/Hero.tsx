"use client";
import UploadCV from "@/components/home/UploadCV";
import React, { useState } from "react";
import Jobs from "./Jobs";


function Hero() {
  const [jobsGenerated, setJobsGenerated] = useState(false);

  const handleJobsGenerated = () => {
    setJobsGenerated(true);
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/5 to-primary/5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20"></div>
      </div>

      <div className="absolute top-20 left-1/4 w-72 h-72 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-r from-primary/15 to-primary/5 rounded-full blur-3xl" />

      <div className="relative z-10 w-full px-6 flex-1 flex flex-col items-center text-center gap-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-10">

          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full border border-primary/20 backdrop-blur-sm">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-primary">
                AI-Powered Resume Assistant
              </span>
            </div>

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

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl font-medium mx-auto">
              Upload your CV, get automated improvements, tailored bullet points,
              and job-specific phrasing — fast and simple.
            </p>
          </div>

          <div className="w-[800px] rounded-2xl p-8 shadow-xl backdrop-blur-sm 
            bg-white/60 dark:bg-neutral-900/60 
            border border-neutral-200 dark:border-neutral-700">
            <UploadCV onJobsGenerated={handleJobsGenerated} />
          </div>

          {/* Jobs component appears below when generated */}
          {jobsGenerated && (
            <div className="w-[5000px] mt-8">
              <Jobs />
            </div>
          )}

        </div>
      </div>

   
    </section>
  );
}

export default Hero;