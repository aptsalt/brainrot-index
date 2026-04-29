"use client";

import { useEffect, useRef, useState } from "react";

const EMOJI_CODES: Record<string, string> = {
  brain: "1f9e0",
  skull: "1f480",
  fire: "1f525",
  dizzy: "1f635-200d-1f4ab",
  speaking: "1f5e3",
  nail: "1f485",
  crown: "1f451",
  cyclone: "1f300",
  phone: "1f4f1",
  clown: "1f921",
  melting: "1fae0",
  crying: "1f62d",
  sparkles: "2728",
  star: "2b50",
  ghost: "1f47b",
  crystal_ball: "1f52e",
};

const EMOJI_KEYS = Object.keys(EMOJI_CODES);

function getTwemojiUrl(code: string): string {
  return `https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/${code}.svg`;
}

interface FloatingItem {
  id: number;
  code: string;
  left: number;
  duration: number;
  delay: number;
  size: number;
}

export function FloatingEmojis() {
  const [items, setItems] = useState<FloatingItem[]>([]);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const floaters: FloatingItem[] = Array.from({ length: 12 }, (_, i) => {
      const key = EMOJI_KEYS[Math.floor(Math.random() * EMOJI_KEYS.length)];
      return {
        id: i,
        code: EMOJI_CODES[key],
        left: Math.random() * 100,
        duration: 10 + Math.random() * 15,
        delay: Math.random() * 12,
        size: 20 + Math.random() * 16,
      };
    });
    setItems(floaters);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {items.map((item) => (
        <img
          key={item.id}
          src={getTwemojiUrl(item.code)}
          alt=""
          className="floating-emoji"
          style={{
            left: `${item.left}%`,
            width: `${item.size}px`,
            height: `${item.size}px`,
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
            filter: "drop-shadow(0 0 4px rgba(168, 85, 247, 0.3))",
          }}
        />
      ))}
    </div>
  );
}
