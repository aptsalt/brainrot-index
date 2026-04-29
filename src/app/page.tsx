"use client";

import { useState } from "react";
import { InputForm } from "@/components/input-form";
import { ScoreCard } from "@/components/score-card";
import { ShareButtons } from "@/components/share-buttons";
import type { BrainRotScore } from "@/lib/dimensions";
import { addEntry } from "@/lib/storage";
import { motion, AnimatePresence } from "motion/react";

export default function Home() {
  const [score, setScore] = useState<BrainRotScore | null>(null);
  const [lastText, setLastText] = useState("");
  const [lastType, setLastType] = useState("");

  const handleScore = (text: string, inputType: string, result: BrainRotScore) => {
    setScore(result);
    setLastText(text);
    setLastType(inputType);
    addEntry(text, inputType, result);
  };

  return (
    <main className="relative z-10 flex flex-col items-center px-4 py-8 md:py-16 pb-24 md:pb-16">
      {/* Marquee banner */}
      <div className="w-full overflow-hidden mb-6 border-y border-purple-500/20 py-1.5">
        <div className="marquee whitespace-nowrap text-xs text-purple-400/60 font-mono">
          BRAINROT DETECTED * COGNITIVE CHAOS LOADING * YOUR THOUGHTS ARE BEING JUDGED * RESISTANCE IS FUTILE * BRAINROT DETECTED * COGNITIVE CHAOS LOADING *
        </div>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-5xl md:text-7xl font-black mb-2 glitch-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
          BrainRot Index
        </h1>
        <p className="text-zinc-500 text-sm font-mono tracking-wider uppercase">
          [ cognitive chaos quantifier v0.1 ]
        </p>
        <p className="text-zinc-400 text-base md:text-lg max-w-md mx-auto mt-3">
          Drop your tweets, shower thoughts, 3 AM notes, or unhinged ideas.
          <br />
          <span className="text-purple-400/60 text-sm">
            We score how cooked your thinking is.
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
            <InputForm onScore={handleScore} />
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: 20 }}
            className="score-reveal"
          >
            <ScoreCard score={score} />
            <ShareButtons score={score} onReset={() => setScore(null)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="mt-12 text-center space-y-1">
        <p className="text-xs text-zinc-600 font-mono">
          // built on real cognitive science, wrapped in chaos
        </p>
        <p className="text-xs text-zinc-700">
          The serious version:{" "}
          <a
            href="https://discuria.space"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-500/50 hover:text-purple-400 transition-colors chromatic"
          >
            discuria.space
          </a>{" "}
          — A GitHub for Thinking
        </p>
      </div>
    </main>
  );
}
