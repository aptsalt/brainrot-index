"use client";

import { useEffect, useState } from "react";

const EMOJIS = ["🧠", "💀", "🔥", "😵‍💫", "🗣️", "💅", "👑", "🌀", "📱", "🤡", "🫠", "😭"];

interface FloatingEmoji {
  id: number;
  emoji: string;
  left: number;
  duration: number;
  delay: number;
  size: number;
}

export function FloatingEmojis() {
  const [emojis, setEmojis] = useState<FloatingEmoji[]>([]);

  useEffect(() => {
    const items: FloatingEmoji[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      left: Math.random() * 100,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 10,
      size: 14 + Math.random() * 18,
    }));
    setEmojis(items);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {emojis.map((e) => (
        <div
          key={e.id}
          className="floating-emoji"
          style={{
            left: `${e.left}%`,
            fontSize: `${e.size}px`,
            animationDuration: `${e.duration}s`,
            animationDelay: `${e.delay}s`,
          }}
        >
          {e.emoji}
        </div>
      ))}
    </div>
  );
}
