"use client";

import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { ModeToggle } from "../theme/mode-toggle";


export default function Navbar() {
  return (
    <header className="w-full bg-transparent">
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="text-lg font-semibold">
          ✨ Resumy AI
        </Link>

        {/* Nav Links */}
        <ul className="hidden sm:flex items-center gap-6 text-sm">
          <li>
            <Link href="#features" className="hover:underline">
              Features
            </Link>
          </li>
          <li>
            <Link href="/jobs" className="hover:underline">
              Jobs
            </Link>
          </li>
          <li>
            <Link href="#about" className="hover:underline">
              About
            </Link>
          </li>
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <ModeToggle /> {/* ✅ Dark/Light/System switch */}

          <Link
            href="/login"
            className="text-sm px-3 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800"
          >
            Sign in
          </Link>

          <Button
            type="button"
            className="hidden sm:inline-flex items-center justify-center bg-foreground text-background text-sm px-4 py-2 rounded-md"
          >
            Get started
          </Button>
        </div>
      </nav>
    </header>
  );
}
