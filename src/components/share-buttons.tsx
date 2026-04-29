"use client";

import { DIMENSIONS, getRotEmoji, getRotLevel } from "@/lib/dimensions";
import type { BrainRotScore } from "@/lib/dimensions";
import { Copy, Share2, RotateCcw } from "lucide-react";
import { useState } from "react";

function generateShareText(score: BrainRotScore): string {
  const emoji = getRotEmoji(score.overall);
  const level = getRotLevel(score.overall);

  const blocks = DIMENSIONS.map((dim) => {
    const val = score.dimensions[dim.id];
    const filled = Math.round(val / 10);
    const empty = 10 - filled;
    return `${dim.emoji} ${"█".repeat(filled)}${"░".repeat(empty)} ${val}`;
  }).join("\n");

  return `${emoji} BrainRot Index: ${score.overall}/100
${level} | ${score.ropiType}

${blocks}

${score.hotTake}

Score yours: brainrotindex.app`;
}

interface ShareButtonsProps {
  score: BrainRotScore;
  onReset: () => void;
}

export function ShareButtons({ score, onReset }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareText = generateShareText(score);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="w-full max-w-lg mx-auto space-y-3 mt-4">
      <div className="flex gap-3">
        <button
          onClick={handleCopy}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-medium transition-all cursor-pointer"
        >
          <Copy className="w-4 h-4" />
          {copied ? "Copied!" : "Copy Wordle Card"}
        </button>
        <button
          onClick={handleTwitter}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-medium transition-all cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
          Share on X
        </button>
      </div>
      <button
        onClick={onReset}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-zinc-700 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 text-sm transition-all cursor-pointer"
      >
        <RotateCcw className="w-4 h-4" />
        Score Another Thought
      </button>
    </div>
  );
}
