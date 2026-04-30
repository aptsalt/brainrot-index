"use client";

import { useState, useEffect } from "react";
import { getHistory, getPatterns, getScoreHistory, clearHistory, type StoredEntry } from "@/lib/storage";
import { DIMENSIONS, getRotEmoji, getRotLevel } from "@/lib/dimensions";
import { motion } from "motion/react";
import { Trash, Brain, TrendUp, Lightning } from "@phosphor-icons/react/dist/ssr";
import { Sparkline } from "@/components/sparkline";

export default function HistoryPage() {
  const [entries, setEntries] = useState<StoredEntry[]>([]);
  const [patterns, setPatterns] = useState(getPatterns());
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [sparkData, setSparkData] = useState<number[]>([]);

  useEffect(() => {
    setEntries(getHistory());
    setPatterns(getPatterns());
    setSparkData(getScoreHistory());
  }, []);

  const handleClear = () => {
    if (confirm("Clear all history? This can't be undone.")) {
      clearHistory();
      setEntries([]);
      setPatterns(getPatterns());
    }
  };

  return (
    <main className="relative z-10 flex flex-col items-center px-4 py-8 md:py-16 pb-24 md:pb-16 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-black mb-2 glitch-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          Rot Archive
        </h1>
        <p className="text-zinc-500 text-sm font-mono">
          [ your cognitive chaos, documented ]
        </p>
      </motion.div>

      {/* Pattern Summary */}
      {patterns.totalEntries > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full comic-panel p-5 mb-8"
        >
          <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2" style={{ color: "var(--muted-strong)" }}>
              <Brain weight="duotone" className="w-4 h-4" /> Your Rot Pattern
            </h2>
            {sparkData.length >= 2 && <Sparkline values={sparkData} />}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-3xl font-black text-purple-400 tabular-nums">
                {patterns.avgOverall}
              </div>
              <div className="text-xs text-zinc-500">Avg Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-pink-400 tabular-nums">
                {patterns.totalEntries}
              </div>
              <div className="text-xs text-zinc-500">Total Scored</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-cyan-400">
                {patterns.strongestDimension
                  ? `${Math.round(patterns.strongestDimension.avg)}`
                  : "-"}
              </div>
              <div className="text-xs text-zinc-500 truncate">
                {patterns.strongestDimension?.name || "Strongest"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-orange-400">
                {patterns.weakestDimension
                  ? `${Math.round(patterns.weakestDimension.avg)}`
                  : "-"}
              </div>
              <div className="text-xs text-zinc-500 truncate">
                {patterns.weakestDimension?.name || "Weakest"}
              </div>
            </div>
          </div>

          {patterns.ropiTypes.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              <Lightning weight="fill" className="w-3 h-3 mt-1" style={{ color: "var(--muted)" }} />
              {patterns.ropiTypes.map((type) => (
                <span
                  key={type}
                  className="text-xs bg-purple-500/10 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/20"
                >
                  {type}
                </span>
              ))}
            </div>
          )}
          </div>
        </motion.div>
      )}

      {/* History list */}
      {entries.length === 0 ? (
        <div className="text-center py-16">
          <TrendUp weight="duotone" className="w-12 h-12 mx-auto mb-4" style={{ color: "var(--muted)" }} />
          <p className="text-zinc-500 text-lg mb-2">No history yet</p>
          <p className="text-zinc-600 text-sm">
            Score some thoughts and they&apos;ll appear here
          </p>
        </div>
      ) : (
        <>
          <div className="w-full flex justify-between items-center mb-4">
            <p className="text-xs text-zinc-600 font-mono">
              {entries.length} entries
            </p>
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 text-xs text-zinc-600 hover:text-red-400 transition-colors cursor-pointer"
            >
              <Trash weight="bold" className="w-3 h-3" />
              Clear All
            </button>
          </div>

          <div className="w-full space-y-2">
            {entries.map((entry, i) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="bg-zinc-900/60 border border-zinc-800/50 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedId(expandedId === entry.id ? null : entry.id)
                  }
                  className="w-full px-4 py-3 flex items-center gap-3 text-left cursor-pointer hover:bg-zinc-800/30 transition-colors"
                >
                  <span className="text-lg">
                    {getRotEmoji(entry.score.overall)}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-zinc-300 truncate font-mono">
                      {entry.text}
                    </p>
                    <p className="text-xs text-zinc-600 mt-0.5">
                      {entry.score.ropiType} &middot;{" "}
                      {new Date(entry.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-xl font-black tabular-nums text-purple-400">
                    {entry.score.overall}
                  </div>
                </button>

                {expandedId === entry.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-4 pb-4 space-y-2"
                  >
                    <p className="text-xs text-zinc-400 bg-zinc-800/50 rounded-lg p-3 font-mono">
                      {entry.text}
                    </p>
                    {DIMENSIONS.map((dim) => {
                      const val = entry.score.dimensions[dim.id];
                      return (
                        <div key={dim.id} className="flex items-center gap-2">
                          <span className="text-xs text-zinc-500 w-36 shrink-0">
                            {dim.emoji} {dim.name}
                          </span>
                          <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${val}%`,
                                backgroundColor: dim.color,
                              }}
                            />
                          </div>
                          <span
                            className="text-xs font-bold tabular-nums w-8 text-right"
                            style={{ color: dim.color }}
                          >
                            {val}
                          </span>
                        </div>
                      );
                    })}
                    <div className="bg-zinc-800/30 rounded-lg p-3 mt-2">
                      <p className="text-xs text-zinc-400">
                        {entry.score.summary}
                      </p>
                      <p className="text-xs text-zinc-300 mt-2 font-medium">
                        &ldquo;{entry.score.hotTake}&rdquo;
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
