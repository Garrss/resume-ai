import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import Navbar from "@/components/landing/Navbar";
import UploadCV from "@/components/landing/UploadCV";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import Image from "next/image";
import React from "react";

export default function Home() {
   return (
    <div className="h-screen min-h-screen flex flex-col bg-background">
      <Navbar />
      <Hero />
      <Toaster />
      <Footer />
    </div>
  );
}
