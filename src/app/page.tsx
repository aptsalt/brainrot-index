"use client";

import { useState } from "react";
import { InputForm } from "@/components/input-form";
import { ScoreCard } from "@/components/score-card";
import { ShareButtons } from "@/components/share-buttons";
import type { BrainRotScore } from "@/lib/dimensions";
import { motion, AnimatePresence } from "motion/react";

export default function Home() {
  const [score, setScore] = useState<BrainRotScore | null>(null);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black pointer-events-none" />

      <main className="relative z-10 flex flex-col items-center px-4 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-5xl md:text-7xl font-black mb-3 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
            BrainRot Index
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-md mx-auto">
            Drop your tweets, shower thoughts, 3 AM notes, or unhinged ideas.
            <br />
            <span className="text-zinc-500">
              AI scores how cooked your thinking is.
            </span>
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!score ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <InputForm onScore={setScore} />
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <ScoreCard score={score} />
              <ShareButtons score={score} onReset={() => setScore(null)} />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-16 text-center">
          <p className="text-xs text-zinc-600">
            Built on a real cognitive scoring framework.{" "}
            <span className="text-zinc-500">
              6 dimensions of thinking, scored by Gemini.
            </span>
          </p>
          <p className="text-xs text-zinc-700 mt-1">
            The serious version:{" "}
            <a
              href="https://discuria.space"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-500/60 hover:text-purple-400 transition-colors"
            >
              discuria.space
            </a>{" "}
            — A GitHub for Thinking
          </p>
        </div>
      </main>
    </div>
  );
}
