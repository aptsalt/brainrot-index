"use client";

import { DIMENSIONS, getRotEmoji, getRotLevel } from "@/lib/dimensions";
import type { BrainRotScore } from "@/lib/dimensions";
import { motion } from "motion/react";

export function ScoreCard({ score }: { score: BrainRotScore }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="w-full max-w-lg mx-auto"
    >
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900/60 to-pink-900/60 px-6 py-5 text-center">
          <div className="text-5xl mb-2">{getRotEmoji(score.overall)}</div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="text-6xl font-black text-white tabular-nums"
          >
            {score.overall}
          </motion.div>
          <div className="text-zinc-300 text-sm mt-1">
            {getRotLevel(score.overall)}
          </div>
          <div className="mt-2 inline-block bg-white/10 px-3 py-1 rounded-full text-sm text-purple-200 font-medium">
            {score.ropiType}
          </div>
        </div>

        {/* Dimensions */}
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
                  <span className="text-sm text-zinc-300">
                    {dim.emoji} {dim.name}
                  </span>
                  <span
                    className="text-sm font-bold tabular-nums"
                    style={{ color: dim.color }}
                  >
                    {value}
                  </span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{
                      delay: 0.5 + i * 0.1,
                      duration: 0.8,
                      ease: "easeOut",
                    }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: dim.color }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="px-6 pb-5 space-y-3">
          <p className="text-zinc-300 text-sm leading-relaxed">
            {score.summary}
          </p>
          <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3">
            <p className="text-sm text-zinc-400 mb-1">Hot Take</p>
            <p className="text-white font-medium">{score.hotTake}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-zinc-800 px-6 py-3 flex items-center justify-between">
          <span className="text-xs text-zinc-500">brainrotindex.app</span>
          <span className="text-xs text-zinc-500">Powered by Gemini</span>
        </div>
      </div>
    </motion.div>
  );
}
