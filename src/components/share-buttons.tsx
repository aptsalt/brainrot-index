"use client";

import { DIMENSIONS, getRotEmoji, getRotLevel } from "@/lib/dimensions";
import type { BrainRotScore } from "@/lib/dimensions";
import { CopySimple, ShareNetwork, ArrowCounterClockwise } from "@phosphor-icons/react/dist/ssr";
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

  const tarot = score.tarotCard ? `\n${score.tarotCard}` : "";

  return `${emoji} BrainRot Index: ${score.overall}/100
${level} | ${score.ropiType}${tarot}

${blocks}

"${score.hotTake}"

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
    <div className="w-full max-w-lg mx-auto space-y-3 mt-5">
      <div className="flex gap-3">
        <button
          onClick={handleCopy}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-zinc-900 border-2 border-zinc-700 text-zinc-200 text-sm font-black transition-all cursor-pointer shadow-[3px_3px_0px_#1a1a1a] hover:shadow-[1px_1px_0px_#1a1a1a] hover:translate-x-0.5 hover:translate-y-0.5 rounded-lg"
        >
          <CopySimple weight="bold" className="w-4 h-4" />
          {copied ? "Copied!" : "Copy Card"}
        </button>
        <button
          onClick={handleTwitter}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-zinc-900 border-2 border-zinc-700 text-zinc-200 text-sm font-black transition-all cursor-pointer shadow-[3px_3px_0px_#1a1a1a] hover:shadow-[1px_1px_0px_#1a1a1a] hover:translate-x-0.5 hover:translate-y-0.5 rounded-lg"
        >
          <ShareNetwork weight="bold" className="w-4 h-4" />
          Share on X
        </button>
      </div>
      <button
        onClick={onReset}
        className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-purple-600 to-pink-600 border-2 border-black text-white text-sm font-black transition-all cursor-pointer shadow-[3px_3px_0px_#000] hover:shadow-[1px_1px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 rounded-lg"
      >
        <ArrowCounterClockwise weight="bold" className="w-4 h-4" />
        Score Another Thought
      </button>
    </div>
  );
}
