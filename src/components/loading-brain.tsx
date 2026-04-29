"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

const STAGES = [
  { label: "Scanning thought patterns", emoji: "🔍", progress: 15 },
  { label: "Measuring yap density", emoji: "🗣️", progress: 30 },
  { label: "Calibrating delulu levels", emoji: "💅", progress: 45 },
  { label: "Detecting main character energy", emoji: "👑", progress: 60 },
  { label: "Consulting the philosophers", emoji: "📜", progress: 75 },
  { label: "Shuffling tarot cards", emoji: "🃏", progress: 88 },
  { label: "Rendering diagnosis", emoji: "🧠", progress: 95 },
];

export function LoadingBrain() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStage((s) => (s < STAGES.length - 1 ? s + 1 : s));
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const current = STAGES[stage];

  return (
    <div className="w-full max-w-lg mx-auto py-12">
      {/* Cooking brain animation */}
      <div className="text-center mb-6">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -5, 5, 0],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-6xl inline-block"
        >
          {current.emoji}
        </motion.div>
      </div>

      {/* Progress bar */}
      <div className="comic-bar h-4 mx-auto" style={{ background: "var(--bar-bg)" }}>
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500"
          initial={{ width: "5%" }}
          animate={{ width: `${current.progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 6px, rgba(0,0,0,0.12) 6px, rgba(0,0,0,0.12) 8px)`,
          }}
        />
      </div>

      {/* Stage label */}
      <motion.p
        key={stage}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-sm font-mono mt-3"
        style={{ color: "var(--foreground-dim)" }}
      >
        {current.label}...
      </motion.p>

      {/* Dimension checklist */}
      <div className="mt-6 space-y-1.5 max-w-xs mx-auto">
        {STAGES.slice(0, stage + 1).map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-xs font-mono"
            style={{ color: i === stage ? "var(--foreground)" : "var(--muted)" }}
          >
            <span>{i < stage ? "✓" : "◌"}</span>
            <span>{s.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
