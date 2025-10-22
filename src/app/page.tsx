import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import Navbar from "@/components/home/Navbar";
import { Toaster } from "@/components/ui/sonner";
import React from "react";

export const metadata = {
  title: "Resume AI — Home",
  description:
    "Upload your resume and let AI generate tailored job suggestions and resume improvements.",
  openGraph: {
    title: "Resume AI — Home",
    description: "AI-powered resume enhancement and job suggestions.",
  },
};

export default function HomePage() {
  return (
    <div className="h-screen min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 overflow-auto">
        <Hero />
      </main>
         <Footer />
    </div>
  );
}
