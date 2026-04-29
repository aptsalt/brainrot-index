"use client";

import { useState } from "react";
import type { BrainRotScore } from "@/lib/dimensions";
import { Loader2, Zap } from "lucide-react";

const INPUT_TYPES = [
  { id: "tweet", label: "Hot Take", emoji: "🐦" },
  { id: "shower_thought", label: "Shower Thought", emoji: "🚿" },
  { id: "late_night_note", label: "3 AM Note", emoji: "🌙" },
  { id: "startup_idea", label: "Startup Idea", emoji: "🚀" },
  { id: "rant", label: "Rant", emoji: "🔥" },
  { id: "random", label: "Unhinged", emoji: "🧠" },
] as const;

const PLACEHOLDERS: Record<string, string> = {
  tweet: "what if dogs don't actually fetch the ball for us. what if they're just returning stolen property and we keep throwing the evidence...",
  shower_thought: "every pizza is a personal pizza if you believe in yourself hard enough. also the earth is just a giant pizza that the sun is slowly cooking",
  late_night_note: "i just realized that \"let that sink in\" is actually about a sink waiting outside your door wanting to come inside. i can't sleep now",
  startup_idea: "uber but for pigeons. you need something delivered across the park? my trained pigeons got you. subscription model. series A ready.",
  rant: "why do we park in driveways but drive on parkways. who decided this. i need answers and nobody in my group chat is taking this seriously enough",
  random: "if you rip a hole in a net, there are actually fewer holes than before. this has been destroying me for 3 days straight",
};

const LOADING_MESSAGES = [
  "Consulting the oracle...",
  "Reading your cognitive aura...",
  "Measuring rot levels...",
  "Diogenes is judging you...",
  "Checking your brainrot vitals...",
  "The tarot cards are shuffling...",
];

interface InputFormProps {
  onScore: (text: string, inputType: string, score: BrainRotScore) => void;
}

export function InputForm({ onScore }: InputFormProps) {
  const [text, setText] = useState("");
  const [inputType, setInputType] = useState("tweet");
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (text.trim().length < 10) {
      setError("Drop at least a sentence. Even brainrot needs substance.");
      return;
    }

    setLoading(true);
    setError("");
    setLoadingMsg(
      LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)]
    );

    // Cycle loading messages
    const interval = setInterval(() => {
      setLoadingMsg(
        LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)]
      );
    }, 2000);

    try {
      const res = await fetch("/api/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, inputType }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something broke");
      }

      const score = await res.json();
      onScore(text, inputType, score);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "The oracle has failed. Try again."
      );
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto space-y-5">
      {/* Input Type Selector — comic style */}
      <div className="flex flex-wrap gap-2 justify-center">
        {INPUT_TYPES.map((type) => (
          <button
            key={type.id}
            onClick={() => setInputType(type.id)}
            className={`px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-all cursor-pointer border-2 rounded-lg ${
              inputType === type.id
                ? "bg-purple-600 text-white border-purple-400 shadow-[2px_2px_0px_#7c3aed]"
                : "bg-zinc-900 text-zinc-500 border-zinc-700 hover:border-zinc-500 hover:text-zinc-300 shadow-[2px_2px_0px_#111]"
            }`}
          >
            {type.emoji} {type.label}
          </button>
        ))}
      </div>

      {/* Text Input — comic panel */}
      <div className="comic-panel bg-zinc-950 p-1">
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={PLACEHOLDERS[inputType] || PLACEHOLDERS.random}
            rows={5}
            maxLength={5000}
            className="w-full bg-transparent px-4 py-3 text-white placeholder-zinc-700 resize-none focus:outline-none font-mono text-sm leading-relaxed"
          />
          <div className="absolute bottom-2 right-3 text-[10px] text-zinc-700 font-mono tabular-nums">
            {text.length}/5000
          </div>
        </div>
      </div>

      {error && (
        <div className="speech-bubble mx-4">
          <p className="text-red-400 text-xs font-mono">{error}</p>
        </div>
      )}

      {/* Submit — big comic button */}
      <button
        onClick={handleSubmit}
        disabled={loading || text.trim().length < 10}
        className="w-full py-3.5 font-black text-base uppercase tracking-wider transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed bg-gradient-to-r from-purple-600 to-pink-600 text-white border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 rounded-lg"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm normal-case">{loadingMsg}</span>
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <Zap className="w-5 h-5" />
            Diagnose My BrainRot
          </span>
        )}
      </button>
    </div>
  );
}
