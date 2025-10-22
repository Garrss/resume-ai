"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const STEPS = [
  {
    id: 1,
    title: "Upload Your CV",
    desc: "Drag & drop or browse to upload your CV (PDF, DOC, DOCX, or TXT).",
    hint: "Pro tip: Clear filenames help keep your uploads organized.",
  },
  {
    id: 2,
    title: "AI Reads & Extracts Info",
    desc: "Our system analyzes your skills, achievements, and experience to extract structured data.",
    hint: "This process is automatic and takes only a moment.",
  },
  {
    id: 3,
    title: "View Recommendations",
    desc: "Get tailored phrasing, bullet improvements, and an optimized resume summary.",
    hint: "Edit or accept any suggestion freely.",
  },
  {
    id: 4,
    title: "Apply Fixes & Regenerate",
    desc: "Refine your resume with AI, then regenerate improved versions until you're satisfied.",
    hint: "Iteration = stronger resume.",
  },
  {
    id: 5,
    title: "Download or Explore Jobs",
    desc: "Export to PDF or browse job matches that fit your refined profile.",
    hint: "Save roles, compare, and apply directly.",
  },
];

export default function GuidePage() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-background pt-24">
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-background via-muted/5 to-primary/5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#404040_1px,transparent_1px),linear-gradient(to_bottom,#404040_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
      </div>

      <main className="relative z-10 max-w-5xl mx-auto px-6 pb-20">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            How Resume AI Works
          </h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Follow these simple steps to upload, improve, and optimize your resume with AI.
          </p>
        </header>

        {/* Steps */}
        <section className="space-y-6">
          {STEPS.map((s) => (
            <article
              key={s.id}
              className="relative p-6 rounded-2xl bg-white/60 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-700 backdrop-blur-sm shadow-sm"
            >
              {/* Step Header */}
              <div className="flex items-start gap-5">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                  <span className="text-primary font-semibold">{s.id}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{s.desc}</p>
                  <p className="text-xs text-muted-foreground/80"><strong>Note:</strong> {s.hint}</p>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <Link href="/">
            <Button className="inline-flex items-center gap-2 px-6 py-3 font-semibold">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
