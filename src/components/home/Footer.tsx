import React from "react";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full py-6 bg-transparent">
      <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          © {year} Resumy AI. All rights reserved.
        </p>

        <div className="flex items-center gap-4">
          <Link href="/privacy" className="text-sm hover:underline">
            Privacy
          </Link>
          <Link href="/terms" className="text-sm hover:underline">
            Terms
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:underline"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}