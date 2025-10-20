import Footer from "@/components/landing/Footer";
import Jobs from "@/components/landing/Jobs";
import Navbar from "@/components/landing/Navbar";
import { Toaster } from "@/components/ui/sonner";
import React from "react";

export const metadata = {
  title: "Jobs — Resume AI",
  description: "Browse suggested jobs tailored to your skills. Save roles or view more details.",
  openGraph: {
    title: "Jobs — Resume AI",
    description: "Browse suggested jobs tailored to your skills.",
  },
};

export default function JobsPage() {
  return (
    <div className="h-screen min-h-screen flex flex-col bg-background">
      <Navbar />
      <Toaster />
      <main className="flex-1 overflow-auto">
        <Jobs />
      </main>
      <Footer />
    </div>
  );
}