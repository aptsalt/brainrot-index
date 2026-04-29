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

  const handleScore = (
    text: string,
    inputType: string,
    result: BrainRotScore
  ) => {
    setScore(result);
    addEntry(text, inputType, result);
  };

  return (
    <main className="relative z-10 flex flex-col items-center px-4 py-6 md:py-12 pb-24 md:pb-16">
      {/* Marquee ticker */}
      <div className="w-full overflow-hidden mb-6 border-y border-purple-500/10 py-1">
        <div className="marquee whitespace-nowrap text-[10px] text-purple-400/40 font-mono tracking-widest uppercase">
          BRAINROT DETECTED &bull; COGNITIVE CHAOS LOADING &bull; YOUR THOUGHTS ARE BEING JUDGED &bull; RESISTANCE IS FUTILE &bull; PREPARE FOR DIAGNOSIS &bull; BRAINROT DETECTED &bull; COGNITIVE CHAOS LOADING &bull;
        </div>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        {/* Comic-style title */}
        <div className="relative inline-block">
          <h1 className="text-5xl md:text-7xl font-black glitch-text comic-bang bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent leading-tight">
            BrainRot
            <br />
            <span className="text-4xl md:text-6xl">Index</span>
          </h1>

          {/* Version badge */}
          <div className="absolute -top-2 -right-4 md:-right-8 bg-yellow-400 text-black px-2 py-0.5 text-[9px] font-black uppercase rotate-12 border border-black shadow-[2px_2px_0px_#000]">
            v0.1
          </div>
        </div>

        <p className="text-xs font-mono mt-3 tracking-wider uppercase" style={{ color: "var(--muted)" }}>
          [ cognitive chaos quantifier ]
        </p>
        <p className="text-sm max-w-sm mx-auto mt-3 leading-relaxed" style={{ color: "var(--foreground-dim)" }}>
          Drop your tweets, shower thoughts, 3 AM notes, startup pitches,
          or unhinged ideas. AI analyzes your cognitive chaos across{" "}
          <span className="text-purple-500 font-bold">6 dimensions</span> and
          reads your{" "}
          <span className="text-pink-500 font-bold">thinking fortune</span>.
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
        <p className="text-[10px] font-mono" style={{ color: "var(--muted)" }}>
          // real cognitive science, wrapped in chaos
        </p>
        <p className="text-[10px]" style={{ color: "var(--muted)" }}>
          The serious version:{" "}
          <a
            href="https://discuria.space"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors"
            style={{ color: "var(--link-color)" }}
          >
            discuria.space
          </a>{" "}
          &mdash; A GitHub for Thinking
        </p>
      </div>
    </main>
  );
}
