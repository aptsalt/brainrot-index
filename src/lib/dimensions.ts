export const DIMENSIONS = [
  {
    id: "yap_density",
    name: "Yap Density",
    emoji: "🗣️",
    color: "#5B8DBE",
    description: "How much you say without actually saying anything",
    realDimension: "Analytical Rigor",
  },
  {
    id: "unhinged_creativity",
    name: "Unhinged Creativity",
    emoji: "🎨",
    color: "#9B7DC9",
    description: "The sheer chaos energy of your ideation",
    realDimension: "Creative Range",
  },
  {
    id: "overthink_spiral",
    name: "Overthink Spiral",
    emoji: "🌀",
    color: "#5ABEAA",
    description: "Depth of your existential rabbit holes",
    realDimension: "Metacognitive Depth",
  },
  {
    id: "delulu_confidence",
    name: "Delulu Confidence",
    emoji: "💅",
    color: "#C9A862",
    description: "How delusionally confident your take is",
    realDimension: "Intellectual Humility",
  },
  {
    id: "main_character_energy",
    name: "Main Character Energy",
    emoji: "👑",
    color: "#C97DAA",
    description: "How hard you're narrating your own movie",
    realDimension: "Synthesis",
  },
  {
    id: "doomscroll_resilience",
    name: "Doomscroll Resilience",
    emoji: "📱",
    color: "#C98B6A",
    description: "Your commitment to the bit, no matter what",
    realDimension: "Persistence",
  },
] as const;

export type DimensionId = (typeof DIMENSIONS)[number]["id"];

export interface BrainRotScore {
  overall: number;
  dimensions: Record<DimensionId, number>;
  ropiType: string;
  summary: string;
  hotTake: string;
  philosopher: string;
  historicalParallel: string;
  tarotCard: string;
  tarotReading: string;
}

export function getRotLevel(score: number): string {
  if (score >= 90) return "Terminally Online";
  if (score >= 75) return "Chronically Cooked";
  if (score >= 60) return "Mid-Rot";
  if (score >= 40) return "Touch Grass Adjacent";
  if (score >= 20) return "Barely Rotted";
  return "NPC Energy";
}

export function getRotEmoji(score: number): string {
  if (score >= 90) return "💀";
  if (score >= 75) return "🧠";
  if (score >= 60) return "😵‍💫";
  if (score >= 40) return "😐";
  if (score >= 20) return "🌱";
  return "🤖";
}
