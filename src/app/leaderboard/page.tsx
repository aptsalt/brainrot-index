"use client";

import { useState, useEffect } from "react";
import {
  LEADERBOARD_CATEGORIES,
  getLeaderboard,
  type StoredEntry,
} from "@/lib/storage";
import { getRotEmoji, getRotLevel } from "@/lib/dimensions";
import { motion } from "motion/react";
import { Trophy } from "lucide-react";

const RANK_STYLES = [
  "text-yellow-400 text-2xl", // 1st
  "text-zinc-300 text-xl",    // 2nd
  "text-amber-600 text-lg",   // 3rd
];

export default function LeaderboardPage() {
  const [activeCategory, setActiveCategory] = useState(
    LEADERBOARD_CATEGORIES[0].id
  );
  const [entries, setEntries] = useState<StoredEntry[]>([]);

  useEffect(() => {
    setEntries(getLeaderboard(activeCategory));
  }, [activeCategory]);

  const category = LEADERBOARD_CATEGORIES.find(
    (c) => c.id === activeCategory
  )!;

  return (
    <main className="relative z-10 flex flex-col items-center px-4 py-8 md:py-16 pb-24 md:pb-16 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-black mb-2 glitch-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
          Hall of Rot
        </h1>
        <p className="text-zinc-500 text-sm font-mono">
          [ the most cooked thoughts, ranked ]
        </p>
      </motion.div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {LEADERBOARD_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              activeCategory === cat.id
                ? "bg-purple-600/20 text-purple-300 border border-purple-500/30 shadow-lg shadow-purple-500/10"
                : "bg-zinc-900 text-zinc-500 border border-zinc-800 hover:border-zinc-700 hover:text-zinc-300"
            }`}
          >
            {cat.emoji} {cat.name}
          </button>
        ))}
      </div>

      {/* Category description */}
      <p className="text-zinc-500 text-sm text-center mb-6">
        {category.emoji} {category.description}
      </p>

      {/* Entries */}
      {entries.length === 0 ? (
        <div className="text-center py-16">
          <Trophy className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
          <p className="text-zinc-500 text-lg mb-2">No entries yet</p>
          <p className="text-zinc-600 text-sm">
            Go score some thoughts to fill the leaderboard
          </p>
        </div>
      ) : (
        <div className="w-full space-y-3">
          {entries.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-3 flex items-start gap-4"
            >
              {/* Rank */}
              <div
                className={`font-black tabular-nums w-8 text-center pt-0.5 ${
                  RANK_STYLES[i] || "text-zinc-600 text-base"
                }`}
              >
                {i === 0 ? "👑" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-zinc-300 text-sm line-clamp-2 font-mono">
                  {entry.text}
                </p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-xs text-purple-400">
                    {entry.score.ropiType}
                  </span>
                  <span className="text-xs text-zinc-600">
                    {new Date(entry.timestamp).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Score */}
              <div className="text-right shrink-0">
                <div className="text-2xl font-black tabular-nums" style={{ color: category.getScore(entry) >= 75 ? "#a855f7" : category.getScore(entry) >= 50 ? "#ec4899" : "#71717a" }}>
                  {category.getScore(entry)}
                </div>
                <div className="text-xs text-zinc-600">
                  {getRotEmoji(entry.score.overall)} {getRotLevel(entry.score.overall)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </main>
  );
}
