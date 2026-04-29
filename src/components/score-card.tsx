"use client";

import { DIMENSIONS, getRotEmoji, getRotLevel } from "@/lib/dimensions";
import type { BrainRotScore } from "@/lib/dimensions";
import { motion } from "motion/react";

export function ScoreCard({ score }: { score: BrainRotScore }) {
  const rotLevel = getRotLevel(score.overall);
  const rotEmoji = getRotEmoji(score.overall);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="w-full max-w-lg mx-auto"
    >
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/10">
        {/* Header — big score reveal */}
        <div className="relative overflow-hidden px-6 py-6 text-center">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-pink-900/20 to-orange-900/30" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.15),transparent_70%)]" />

          <div className="relative">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="text-5xl mb-1"
            >
              {rotEmoji}
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="text-7xl font-black tabular-nums neon-purple"
            >
              {score.overall}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-zinc-400 text-sm mt-1 font-mono uppercase tracking-widest"
            >
              {rotLevel}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-3 inline-block bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 px-4 py-1.5 rounded-full"
            >
              <span className="text-sm font-bold text-purple-200 chromatic">
                {score.ropiType}
              </span>
            </motion.div>
          </div>
        </div>

        {/* Dimensions with enhanced bars */}
        <div className="px-6 py-5 space-y-3">
          {DIMENSIONS.map((dim, i) => {
            const value = score.dimensions[dim.id];
            return (
              <motion.div
                key={dim.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-zinc-400 font-mono">
                    {dim.emoji} {dim.name}
                  </span>
                  <span
                    className="text-sm font-black tabular-nums"
                    style={{ color: dim.color }}
                  >
                    {value}
                  </span>
                </div>
                <div className="h-2.5 bg-zinc-800/80 rounded-full overflow-hidden border border-zinc-700/30">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{
                      delay: 0.5 + i * 0.1,
                      duration: 0.8,
                      ease: "easeOut",
                    }}
                    className="h-full rounded-full relative"
                    style={{
                      backgroundColor: dim.color,
                      boxShadow: `0 0 8px ${dim.color}40`,
                    }}
                  >
                    {value >= 70 && (
                      <div
                        className="absolute inset-0 rounded-full animate-pulse"
                        style={{ backgroundColor: `${dim.color}30` }}
                      />
                    )}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="px-6 pb-5 space-y-3">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-zinc-300 text-sm leading-relaxed font-mono"
          >
            {score.summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="bg-gradient-to-r from-zinc-800/80 to-zinc-800/40 border border-zinc-700/50 rounded-xl px-4 py-3"
          >
            <p className="text-[10px] text-zinc-500 mb-1 font-mono uppercase tracking-widest">
              Hot Take
            </p>
            <p className="text-white font-bold text-sm chromatic">
              {score.hotTake}
            </p>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="border-t border-zinc-800/50 px-6 py-2.5 flex items-center justify-between bg-zinc-950/50">
          <span className="text-[10px] text-zinc-600 font-mono">
            brainrotindex.app
          </span>
          <span className="text-[10px] text-zinc-600 font-mono">
            Powered by Gemini
          </span>
        </div>
      </div>
    </motion.div>
  );
}
