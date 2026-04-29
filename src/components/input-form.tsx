"use client";

import { useState } from "react";
import type { BrainRotScore } from "@/lib/dimensions";
import { Lightning } from "@phosphor-icons/react/dist/ssr";
import { LoadingBrain } from "./loading-brain";

const INPUT_TYPES = [
  { id: "tweet", label: "Hot Take", emoji: "🐦" },
  { id: "shower_thought", label: "Shower Thought", emoji: "🚿" },
  { id: "late_night_note", label: "3 AM Note", emoji: "🌙" },
  { id: "startup_idea", label: "Startup Idea", emoji: "🚀" },
  { id: "rant", label: "Rant", emoji: "🔥" },
  { id: "random", label: "Unhinged", emoji: "🧠" },
  { id: "friend", label: "Friend's Take", emoji: "👀" },
] as const;

const PLACEHOLDERS: Record<string, string> = {
  tweet: "what if dogs don't actually fetch the ball for us. what if they're just returning stolen property and we keep throwing the evidence...",
  shower_thought: "every pizza is a personal pizza if you believe in yourself hard enough. also the earth is just a giant pizza that the sun is slowly cooking",
  late_night_note: "i just realized that \"let that sink in\" is actually about a sink waiting outside your door wanting to come inside. i can't sleep now",
  startup_idea: "uber but for pigeons. you need something delivered across the park? my trained pigeons got you. subscription model. series A ready.",
  rant: "why do we park in driveways but drive on parkways. who decided this. i need answers and nobody in my group chat is taking this seriously enough",
  random: "if you rip a hole in a net, there are actually fewer holes than before. this has been destroying me for 3 days straight",
  friend: "paste your friend's tweet, message, or hot take here and let AI roast their thinking...",
};

const EXAMPLE_PROMPTS = [
  { text: "normalize quitting your job to become a pigeon. they walk around all day, eat free bread, and nobody asks them about their five year plan", type: "tweet" },
  { text: "what if deja vu is just the simulation buffering and loading a cached version of reality because the server is under too much load", type: "shower_thought" },
  { text: "my toxic trait is thinking i can build a billion dollar company between the hours of 11pm and 3am while eating cereal in my underwear", type: "late_night_note" },
  { text: "uber but for pigeons. you need something delivered across the park? my trained pigeons got you. subscription model. series A ready. we call it PigeonDrop", type: "startup_idea" },
  { text: "i refuse to believe that the person who invented alarm clocks wasn't some kind of villain. you literally created a device whose only purpose is to ruin the best part of everyone's day", type: "rant" },
];

interface InputFormProps {
  onScore: (text: string, inputType: string, score: BrainRotScore) => void;
}

export function InputForm({ onScore }: InputFormProps) {
  const [text, setText] = useState("");
  const [inputType, setInputType] = useState("tweet");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (overrideText?: string, overrideType?: string) => {
    const submitText = overrideText || text;
    const submitType = overrideType || inputType;

    if (submitText.trim().length < 10) {
      setError("Drop at least a sentence. Even brainrot needs substance.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: submitText, inputType: submitType }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something broke");
      }

      const score = await res.json();
      onScore(submitText, submitType, score);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "The oracle has failed. Try again."
      );
      setLoading(false);
    }
  };

  const handleExample = (example: (typeof EXAMPLE_PROMPTS)[number]) => {
    setText(example.text);
    setInputType(example.type);
    handleSubmit(example.text, example.type);
  };

  if (loading) {
    return <LoadingBrain />;
  }

  return (
    <div className="w-full max-w-lg mx-auto space-y-5">
      {/* Input Type Selector */}
      <div className="flex flex-wrap gap-2 justify-center">
        {INPUT_TYPES.map((type) => (
          <button
            key={type.id}
            onClick={() => setInputType(type.id)}
            className={`px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-all cursor-pointer border-2 rounded-lg ${
              inputType === type.id
                ? "bg-purple-600 text-white border-purple-400 shadow-[2px_2px_0px_#7c3aed]"
                : "border-[var(--panel-border)] shadow-[2px_2px_0px_var(--panel-shadow)]"
            }`}
            style={
              inputType !== type.id
                ? { background: "var(--panel-bg)", color: "var(--muted)" }
                : undefined
            }
          >
            {type.emoji} {type.label}
          </button>
        ))}
      </div>

      {/* Text Input */}
      <div className="comic-panel p-1">
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={PLACEHOLDERS[inputType] || PLACEHOLDERS.random}
            rows={5}
            maxLength={5000}
            className="w-full bg-transparent px-4 py-3 resize-none focus:outline-none font-mono text-sm leading-relaxed"
            style={{ color: "var(--input-text)" }}
          />
          <div
            className="absolute bottom-2 right-3 text-[10px] font-mono tabular-nums"
            style={{ color: "var(--muted)" }}
          >
            {text.length}/5000
          </div>
        </div>
      </div>

      {error && (
        <div className="speech-bubble mx-4">
          <p className="text-red-400 text-xs font-mono">{error}</p>
        </div>
      )}

      {/* Submit */}
      <button
        onClick={() => handleSubmit()}
        disabled={text.trim().length < 10}
        className="w-full py-3.5 font-black text-base uppercase tracking-wider transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed bg-gradient-to-r from-purple-600 to-pink-600 text-white border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 rounded-lg"
      >
        <span className="flex items-center justify-center gap-2">
          <Lightning weight="fill" className="w-5 h-5" />
          Diagnose My BrainRot
        </span>
      </button>

      {/* Example Prompts */}
      <div className="space-y-2">
        <p
          className="text-[10px] font-mono uppercase tracking-widest text-center"
          style={{ color: "var(--muted)" }}
        >
          Or try one of these
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {EXAMPLE_PROMPTS.map((example, i) => (
            <button
              key={i}
              onClick={() => handleExample(example)}
              className="text-[11px] px-3 py-1.5 rounded-lg border font-mono cursor-pointer transition-all hover:translate-y-[-1px]"
              style={{
                background: "var(--panel-bg)",
                borderColor: "var(--panel-border)",
                color: "var(--foreground-dim)",
              }}
            >
              {example.text.slice(0, 40)}...
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
