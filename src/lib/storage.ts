import type { BrainRotScore, DimensionId } from "./dimensions";

export interface StoredEntry {
  id: string;
  text: string;
  inputType: string;
  score: BrainRotScore;
  timestamp: number;
}

const STORAGE_KEY = "brainrot-index-history";

function getEntries(): StoredEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveEntries(entries: StoredEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function addEntry(
  text: string,
  inputType: string,
  score: BrainRotScore
): StoredEntry {
  const entry: StoredEntry = {
    id: crypto.randomUUID(),
    text,
    inputType,
    score,
    timestamp: Date.now(),
  };
  const entries = getEntries();
  entries.unshift(entry);
  saveEntries(entries.slice(0, 100)); // keep last 100
  return entry;
}

export function getHistory(): StoredEntry[] {
  return getEntries();
}

export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY);
}

// Leaderboard categories
export interface LeaderboardCategory {
  id: string;
  name: string;
  emoji: string;
  description: string;
  getScore: (entry: StoredEntry) => number;
}

export const LEADERBOARD_CATEGORIES: LeaderboardCategory[] = [
  {
    id: "most_cooked",
    name: "Most Cooked",
    emoji: "🔥",
    description: "Highest overall brainrot score",
    getScore: (e) => e.score.overall,
  },
  {
    id: "yap_champion",
    name: "Yap Champion",
    emoji: "🗣️",
    description: "Maximum yapping, minimum substance",
    getScore: (e) => e.score.dimensions.yap_density,
  },
  {
    id: "delulu_award",
    name: "Delulu Award",
    emoji: "💅",
    description: "Peak delusional confidence",
    getScore: (e) => e.score.dimensions.delulu_confidence,
  },
  {
    id: "certified_overthinker",
    name: "Certified Overthinker",
    emoji: "🌀",
    description: "Deepest spiral into the void",
    getScore: (e) => e.score.dimensions.overthink_spiral,
  },
  {
    id: "main_character",
    name: "Main Character",
    emoji: "👑",
    description: "Everyone else is an NPC",
    getScore: (e) => e.score.dimensions.main_character_energy,
  },
];

export function getLeaderboard(categoryId: string): StoredEntry[] {
  const category = LEADERBOARD_CATEGORIES.find((c) => c.id === categoryId);
  if (!category) return [];
  return getEntries()
    .sort((a, b) => category.getScore(b) - category.getScore(a))
    .slice(0, 10);
}

export function getPatterns(): {
  avgOverall: number;
  totalEntries: number;
  strongestDimension: { name: string; avg: number } | null;
  weakestDimension: { name: string; avg: number } | null;
  favoriteType: string | null;
  ropiTypes: string[];
} {
  const entries = getEntries();
  if (entries.length === 0) {
    return {
      avgOverall: 0,
      totalEntries: 0,
      strongestDimension: null,
      weakestDimension: null,
      favoriteType: null,
      ropiTypes: [],
    };
  }

  const avgOverall =
    entries.reduce((sum, e) => sum + e.score.overall, 0) / entries.length;

  const dimIds: DimensionId[] = [
    "yap_density",
    "unhinged_creativity",
    "overthink_spiral",
    "delulu_confidence",
    "main_character_energy",
    "doomscroll_resilience",
  ];

  const dimLabels: Record<DimensionId, string> = {
    yap_density: "Yap Density",
    unhinged_creativity: "Unhinged Creativity",
    overthink_spiral: "Overthink Spiral",
    delulu_confidence: "Delulu Confidence",
    main_character_energy: "Main Character Energy",
    doomscroll_resilience: "Doomscroll Resilience",
  };

  const dimAvgs = dimIds.map((id) => ({
    name: dimLabels[id],
    avg:
      entries.reduce((sum, e) => sum + e.score.dimensions[id], 0) /
      entries.length,
  }));

  const sorted = [...dimAvgs].sort((a, b) => b.avg - a.avg);

  const typeCounts: Record<string, number> = {};
  entries.forEach((e) => {
    typeCounts[e.inputType] = (typeCounts[e.inputType] || 0) + 1;
  });
  const favoriteType = Object.entries(typeCounts).sort(
    (a, b) => b[1] - a[1]
  )[0]?.[0] ?? null;

  const ropiTypes = [...new Set(entries.map((e) => e.score.ropiType))].slice(
    0,
    5
  );

  return {
    avgOverall: Math.round(avgOverall),
    totalEntries: entries.length,
    strongestDimension: sorted[0] ?? null,
    weakestDimension: sorted[sorted.length - 1] ?? null,
    favoriteType,
    ropiTypes,
  };
}
