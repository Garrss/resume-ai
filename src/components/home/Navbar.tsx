"use client";

import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { ModeToggle } from "../theme/mode-toggle";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";

export default function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <header className="w-full bg-transparent">
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-semibold">
          ✨ Resumy AI
        </Link>

        <ul className="hidden sm:flex items-center gap-6 text-sm">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link href="/guide" className="hover:underline">
              Guide
            </Link>
          </li>
          <li>
            <Link href="#about" className="hover:underline">
              About
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          <ModeToggle /> {/* Dark/Light/System switch */}

          {isSignedIn ? (
            <>
              <Button
                type="button"
                className="hidden sm:inline-flex items-center justify-center bg-foreground text-background text-sm px-4 py-2 rounded-md"
              >
                <Link href="/">Get started</Link>
              </Button>
              <UserButton />
            </>
          ) : (
            <>
              <SignInButton>
                <Button className="text-sm px-3 py-1.5 rounded-md font-medium bg-blue-400 text-white hover:bg-gray-500 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-900">
                  Get Started
                </Button>

              </SignInButton>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
