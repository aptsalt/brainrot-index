"use client";

import Link from "next/link";
import { motion } from "motion/react";

export default function NotFound() {
  return (
    <main className="relative z-10 flex flex-col items-center justify-center px-4 py-20 min-h-[70vh]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="text-8xl font-black comic-bang bg-gradient-to-b from-purple-400 to-purple-700 bg-clip-text text-transparent mb-4">
          404
        </div>

        <h1
          className="text-2xl font-black mb-2"
          style={{ color: "var(--foreground)" }}
        >
          This page touched grass
        </h1>
        <p
          className="text-sm font-mono mb-8 max-w-xs mx-auto"
          style={{ color: "var(--muted)" }}
        >
          It went outside, felt the sun, and never came back.
          We respect its journey.
        </p>

        <div className="space-y-3">
          <p className="text-6xl">🌱</p>

          <Link
            href="/"
            className="inline-block px-6 py-3 font-black text-sm uppercase tracking-wider bg-gradient-to-r from-purple-600 to-pink-600 text-white border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 rounded-lg transition-all"
          >
            Return to the rot
          </Link>
        </div>

        <p
          className="text-[10px] font-mono mt-8"
          style={{ color: "var(--muted)" }}
        >
          brainrot index: 0/100 &middot; NPC Energy &middot; The Hermit
        </p>
      </motion.div>
    </main>
  );
}
