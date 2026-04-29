"use client";

import { useState } from "react";
import type { BrainRotScore } from "@/lib/dimensions";
import { Loader2 } from "lucide-react";

const INPUT_TYPES = [
  { id: "tweet", label: "Tweet / Hot Take", emoji: "🐦" },
  { id: "shower_thought", label: "Shower Thought", emoji: "🚿" },
  { id: "late_night_note", label: "3 AM Note", emoji: "🌙" },
  { id: "startup_idea", label: "Startup Idea", emoji: "🚀" },
  { id: "rant", label: "Rant / Vent", emoji: "🔥" },
  { id: "random", label: "Unhinged Thought", emoji: "🧠" },
] as const;

const PLACEHOLDERS: Record<string, string> = {
  tweet: "what if dogs don't actually fetch the ball for us. what if they're just returning stolen property and we keep throwing the evidence...",
  shower_thought: "every pizza is a personal pizza if you believe in yourself hard enough. also the earth is just a giant pizza that the sun is slowly cooking",
  late_night_note: "i just realized that \"let that sink in\" is actually about a sink waiting outside your door wanting to come inside. i can't sleep now",
  startup_idea: "uber but for pigeons. you need something delivered across the park? my trained pigeons got you. subscription model. series A ready.",
  rant: "why do we park in driveways but drive on parkways. who decided this. i need answers and nobody in my group chat is taking this seriously enough",
  random: "if you rip a hole in a net, there are actually fewer holes than before. this has been destroying me for 3 days straight",
};

interface InputFormProps {
  onScore: (score: BrainRotScore) => void;
}

export function InputForm({ onScore }: InputFormProps) {
  const [text, setText] = useState("");
  const [inputType, setInputType] = useState("tweet");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (text.trim().length < 10) {
      setError("Drop at least a sentence. Even brainrot needs substance.");
      return;
    }

    setLoading(true);
    setError("");

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
      onScore(score);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Gemini couldn't handle it"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto space-y-5">
      {/* Input Type Selector */}
      <div className="flex flex-wrap gap-2 justify-center">
        {INPUT_TYPES.map((type) => (
          <button
            key={type.id}
            onClick={() => setInputType(type.id)}
            className={`px-3 py-1.5 rounded-full text-sm transition-all cursor-pointer ${
              inputType === type.id
                ? "bg-purple-600 text-white shadow-lg shadow-purple-500/25"
                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200"
            }`}
          >
            {type.emoji} {type.label}
          </button>
        ))}
      </div>

      {/* Text Input */}
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={PLACEHOLDERS[inputType] || PLACEHOLDERS.random}
          rows={6}
          maxLength={5000}
          className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 resize-none focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
        />
        <div className="absolute bottom-3 right-3 text-xs text-zinc-600">
          {text.length}/5000
        </div>
      </div>

      {error && (
        <p className="text-red-400 text-sm text-center">{error}</p>
      )}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading || text.trim().length < 10}
        className="w-full py-3 rounded-xl font-bold text-lg transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            Analyzing your rot...
          </span>
        ) : (
          "Score My BrainRot 🧠"
        )}
      </button>
    </div>
  );
}
