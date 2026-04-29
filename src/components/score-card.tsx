"use client";

import { DIMENSIONS, getRotEmoji, getRotLevel } from "@/lib/dimensions";
import type { BrainRotScore } from "@/lib/dimensions";
import { motion } from "motion/react";
import { Scroll, SparkleIcon, Clock } from "@phosphor-icons/react/dist/ssr";

const TAROT_SYMBOLS: Record<string, string> = {
  "The Fool": "0",
  "The Magician": "I",
  "The High Priestess": "II",
  "The Empress": "III",
  "The Emperor": "IV",
  "The Hierophant": "V",
  "The Lovers": "VI",
  "The Chariot": "VII",
  "Strength": "VIII",
  "The Hermit": "IX",
  "Wheel of Fortune": "X",
  "Justice": "XI",
  "The Hanged Man": "XII",
  "Death": "XIII",
  "Temperance": "XIV",
  "The Devil": "XV",
  "The Tower": "XVI",
  "The Star": "XVII",
  "The Moon": "XVIII",
  "The Sun": "XIX",
  "Judgement": "XX",
  "The World": "XXI",
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

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="w-full max-w-lg mx-auto space-y-4"
    >
      {/* === MAIN SCORE PANEL === */}
      <div className="comic-panel halftone">
        <div className="absolute inset-0 action-lines" />

        <div className="relative z-10 px-6 py-6 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
            className="inline-block mb-3"
          >
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-1 -rotate-2 border-2 border-black shadow-[3px_3px_0px_#000]">
              <span className="text-white font-black text-xs tracking-widest uppercase">
                Diagnosis Complete
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="relative inline-block"
          >
            {score.overall >= 70 && (
              <div className="absolute inset-0 -m-8 starburst opacity-20">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <polygon
                    points="100,10 120,80 190,80 130,120 150,190 100,145 50,190 70,120 10,80 80,80"
                    fill="currentColor"
                    className="text-purple-500"
                  />
                </svg>
              </div>
            )}
            <div
              className="text-8xl font-black tabular-nums comic-bang bg-gradient-to-b from-purple-400 via-purple-500 to-purple-700 bg-clip-text text-transparent"
            >
              {score.overall}
            </div>
          </motion.div>

          <div className="text-lg mt-1">
            <span className="mr-2">{rotEmoji}</span>
            <span
              className="font-black uppercase tracking-wide text-sm"
              style={{ color: "var(--foreground-dim)" }}
            >
              {rotLevel}
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-3 inline-block"
          >
            <div
              className="px-4 py-1.5 rounded-full"
              style={{
                background: "var(--badge-bg)",
                border: "1px solid var(--badge-border)",
              }}
            >
              <span
                className="text-sm font-black"
                style={{ color: "var(--badge-text)" }}
              >
                {score.ropiType}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* === DIMENSION BARS === */}
      <div className="comic-panel p-5">
        <div className="relative z-10 space-y-2.5">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-yellow-400 text-black px-2 py-0.5 text-[10px] font-black uppercase tracking-wider border border-black shadow-[2px_2px_0px_#000]">
              Stats
            </div>
          </div>

          {DIMENSIONS.map((dim, i) => {
            const value = score.dimensions[dim.id];
            return (
              <motion.div
                key={dim.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
              >
                <div className="flex justify-between items-center mb-1">
                  <span
                    className="text-xs font-mono font-bold"
                    style={{ color: "var(--label-text)" }}
                  >
                    {dim.emoji} {dim.name}
                  </span>
                  <span
                    className="text-xs font-black tabular-nums font-mono"
                    style={{ color: dim.color }}
                  >
                    {value}/100
                  </span>
                </div>
                <div className="comic-bar h-3" style={{ background: "var(--bar-bg)" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{
                      delay: 0.5 + i * 0.08,
                      duration: 0.6,
                      ease: "easeOut",
                    }}
                    className="h-full relative"
                    style={{
                      backgroundColor: dim.color,
                      backgroundImage: `repeating-linear-gradient(
                        90deg,
                        transparent,
                        transparent 8px,
                        rgba(0,0,0,0.12) 8px,
                        rgba(0,0,0,0.12) 10px
                      )`,
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* === ROAST === */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <div className="speech-bubble mx-2">
          <p
            className="text-sm leading-relaxed font-mono"
            style={{ color: "var(--foreground)" }}
          >
            {score.summary}
          </p>
        </div>
        <div className="h-4" />
      </motion.div>

      {/* === HOT TAKE === */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 1.1, type: "spring" }}
        style={{ background: "var(--hot-take-bg)" }}
        className="comic-panel"
      >
        <div className="relative z-10 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-red-500 text-white px-2 py-0.5 text-[10px] font-black uppercase tracking-wider border border-black shadow-[2px_2px_0px_#000] rotate-[-1deg]">
              Hot Take
            </div>
          </div>
          <p
            className="font-black text-lg leading-snug"
            style={{ color: "var(--hot-take-text)" }}
          >
            &ldquo;{score.hotTake}&rdquo;
          </p>
        </div>
      </motion.div>

      {/* === TAROT CARD === */}
      {score.tarotCard && (
        <motion.div
          initial={{ opacity: 0, rotateY: 90 }}
          animate={{ opacity: 1, rotateY: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="tarot-card p-6 text-center stars-pattern"
        >
          <div className="relative z-10">
            <div
              className="text-6xl font-serif font-bold mb-2"
              style={{ color: "var(--tarot-numeral)" }}
            >
              {tarotNumeral}
            </div>

            <SparkleIcon
              weight="fill"
              className="w-5 h-5 mx-auto mb-2"
              style={{ color: "var(--tarot-dim)" }}
            />

            <h3
              className="font-black text-xl tracking-wide uppercase mb-2"
              style={{ color: "var(--tarot-text)" }}
            >
              {score.tarotCard}
            </h3>

            <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent mx-auto mb-3" />

            <p
              className="text-sm italic leading-relaxed"
              style={{ color: "var(--tarot-dim)" }}
            >
              {score.tarotReading}
            </p>
          </div>
        </motion.div>
      )}

      {/* === PHILOSOPHER + HISTORICAL === */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {score.philosopher && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 }}
            className="comic-panel p-4"
          >
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <Scroll
                  weight="duotone"
                  className="w-4 h-4"
                  style={{ color: "var(--philosopher-label)" }}
                />
                <span
                  className="text-[10px] font-black uppercase tracking-widest"
                  style={{ color: "var(--philosopher-label)" }}
                >
                  Philosopher&apos;s Take
                </span>
              </div>
              <p
                className="text-xs leading-relaxed italic font-mono"
                style={{ color: "var(--foreground)" }}
              >
                &ldquo;{score.philosopher}&rdquo;
              </p>
            </div>
          </motion.div>
        )}

        {score.historicalParallel && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6 }}
            className="comic-panel p-4"
          >
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <Clock
                  weight="duotone"
                  className="w-4 h-4"
                  style={{ color: "var(--historian-label)" }}
                />
                <span
                  className="text-[10px] font-black uppercase tracking-widest"
                  style={{ color: "var(--historian-label)" }}
                >
                  History Rhymes
                </span>
              </div>
              <p
                className="text-xs leading-relaxed italic font-mono"
                style={{ color: "var(--foreground)" }}
              >
                &ldquo;{score.historicalParallel}&rdquo;
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center py-2">
        <span className="text-[10px] font-mono" style={{ color: "var(--muted)" }}>
          brainrotindex.app &middot; Powered by Gemini
        </span>
      </div>
    </motion.div>
  );
}
