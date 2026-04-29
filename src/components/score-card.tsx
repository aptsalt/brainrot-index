"use client";

import { useEffect } from "react";
import { DIMENSIONS, getRotEmoji, getRotLevel } from "@/lib/dimensions";
import type { BrainRotScore } from "@/lib/dimensions";
import { motion } from "motion/react";
import { Scroll, SparkleIcon, Clock } from "@phosphor-icons/react/dist/ssr";
import { AnimatedCounter } from "./animated-counter";
import { playScoreReveal, playHighScore } from "@/lib/sounds";
import confetti from "canvas-confetti";

const TAROT_SYMBOLS: Record<string, string> = {
  "The Fool": "0", "The Magician": "I", "The High Priestess": "II",
  "The Empress": "III", "The Emperor": "IV", "The Hierophant": "V",
  "The Lovers": "VI", "The Chariot": "VII", "Strength": "VIII",
  "The Hermit": "IX", "Wheel of Fortune": "X", "Justice": "XI",
  "The Hanged Man": "XII", "Death": "XIII", "Temperance": "XIV",
  "The Devil": "XV", "The Tower": "XVI", "The Star": "XVII",
  "The Moon": "XVIII", "The Sun": "XIX", "Judgement": "XX", "The World": "XXI",
};

function getTarotNumeral(card: string): string {
  for (const [name, numeral] of Object.entries(TAROT_SYMBOLS)) {
    if (card.toLowerCase().includes(name.toLowerCase())) return numeral;
  }
  return "?";
}

export function ScoreCard({ score }: { score: BrainRotScore }) {
  const rotLevel = getRotLevel(score.overall);
  const rotEmoji = getRotEmoji(score.overall);
  const tarotNumeral = getTarotNumeral(score.tarotCard || "");

  useEffect(() => {
    // Sound effects
    if (score.overall >= 80) {
      playHighScore();
    } else {
      playScoreReveal();
    }

    // Confetti for high scores
    if (score.overall >= 80) {
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.3 },
          colors: ["#a855f7", "#ec4899", "#f97316", "#22d3ee"],
        });
      }, 600);
    }
  }, [score.overall]);

  return (
    <div className="w-full space-y-3">
      {/* === ROW 1: Score + Dimensions side by side on desktop === */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* LEFT: Big score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring" }}
          className="comic-panel halftone"
        >
          <div className="absolute inset-0 action-lines" />
          <div className="relative z-10 px-5 py-5 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              className="relative inline-block"
            >
              {score.overall >= 70 && (
                <div className="absolute inset-0 -m-6 starburst opacity-20">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <polygon
                      points="100,10 120,80 190,80 130,120 150,190 100,145 50,190 70,120 10,80 80,80"
                      fill="currentColor"
                      className="text-purple-500"
                    />
                  </svg>
                </div>
              )}
              <div className="text-7xl md:text-8xl font-black tabular-nums comic-bang bg-gradient-to-b from-purple-400 via-purple-500 to-purple-700 bg-clip-text text-transparent">
                <AnimatedCounter value={score.overall} duration={1500} />
              </div>
            </motion.div>

            <div className="mt-1">
              <span className="mr-1.5">{rotEmoji}</span>
              <span className="font-black uppercase tracking-wide text-xs" style={{ color: "var(--foreground-dim)" }}>
                {rotLevel}
              </span>
            </div>

            <div
              className="mt-2 inline-block px-3 py-1 rounded-full text-xs font-black"
              style={{
                background: "var(--badge-bg)",
                border: "1px solid var(--badge-border)",
                color: "var(--badge-text)",
              }}
            >
              {score.ropiType}
            </div>
          </div>
        </motion.div>

        {/* RIGHT: Dimension bars */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="comic-panel p-4"
        >
          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-yellow-400 text-black px-2 py-0.5 text-[9px] font-black uppercase tracking-wider border border-black shadow-[2px_2px_0px_#000]">
                Stats
              </div>
            </div>

            {DIMENSIONS.map((dim, i) => {
              const value = score.dimensions[dim.id];
              return (
                <motion.div
                  key={dim.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                >
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="text-[11px] font-mono font-bold" style={{ color: "var(--label-text)" }}>
                      {dim.emoji} {dim.name}
                    </span>
                    <span className="text-[11px] font-black tabular-nums font-mono" style={{ color: dim.color }}>
                      {value}
                    </span>
                  </div>
                  <div className="comic-bar h-2" style={{ background: "var(--bar-bg)" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${value}%` }}
                      transition={{ delay: 0.4 + i * 0.05, duration: 0.5, ease: "easeOut" }}
                      className="h-full"
                      style={{
                        backgroundColor: dim.color,
                        backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 6px, rgba(0,0,0,0.12) 6px, rgba(0,0,0,0.12) 8px)`,
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* === ROW 2: Roast + Hot Take side by side === */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Roast */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="speech-bubble h-full">
            <p className="text-sm leading-relaxed font-mono" style={{ color: "var(--foreground)" }}>
              {score.summary}
            </p>
          </div>
        </motion.div>

        {/* Hot Take */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, type: "spring" }}
          style={{ background: "var(--hot-take-bg)" }}
          className="comic-panel"
        >
          <div className="relative z-10 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-red-500 text-white px-2 py-0.5 text-[9px] font-black uppercase tracking-wider border border-black shadow-[2px_2px_0px_#000] rotate-[-1deg]">
                Hot Take
              </div>
            </div>
            <p className="font-black text-base leading-snug" style={{ color: "var(--hot-take-text)" }}>
              &ldquo;{score.hotTake}&rdquo;
            </p>
          </div>
        </motion.div>
      </div>

      {/* === ROW 3: Tarot + Philosopher + History — 3 columns on desktop === */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Tarot */}
        {score.tarotCard && (
          <motion.div
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="tarot-card p-4 text-center stars-pattern"
          >
            <div className="relative z-10">
              <div className="text-4xl font-serif font-bold mb-1" style={{ color: "var(--tarot-numeral)" }}>
                {tarotNumeral}
              </div>
              <SparkleIcon weight="fill" className="w-4 h-4 mx-auto mb-1" style={{ color: "var(--tarot-dim)" }} />
              <h3 className="font-black text-sm tracking-wide uppercase mb-1" style={{ color: "var(--tarot-text)" }}>
                {score.tarotCard}
              </h3>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent mx-auto mb-2" />
              <p className="text-xs italic leading-relaxed" style={{ color: "var(--tarot-dim)" }}>
                {score.tarotReading}
              </p>
            </div>
          </motion.div>
        )}

        {/* Philosopher */}
        {score.philosopher && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="comic-panel p-4"
          >
            <div className="relative z-10">
              <div className="flex items-center gap-1.5 mb-2">
                <Scroll weight="duotone" className="w-3.5 h-3.5" style={{ color: "var(--philosopher-label)" }} />
                <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: "var(--philosopher-label)" }}>
                  Philosopher
                </span>
              </div>
              <p className="text-xs leading-relaxed italic font-mono" style={{ color: "var(--foreground)" }}>
                &ldquo;{score.philosopher}&rdquo;
              </p>
            </div>
          </motion.div>
        )}

        {/* Historical */}
        {score.historicalParallel && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="comic-panel p-4"
          >
            <div className="relative z-10">
              <div className="flex items-center gap-1.5 mb-2">
                <Clock weight="duotone" className="w-3.5 h-3.5" style={{ color: "var(--historian-label)" }} />
                <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: "var(--historian-label)" }}>
                  History Rhymes
                </span>
              </div>
              <p className="text-xs leading-relaxed italic font-mono" style={{ color: "var(--foreground)" }}>
                &ldquo;{score.historicalParallel}&rdquo;
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
