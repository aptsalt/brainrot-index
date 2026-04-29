"use client";

import { useEffect, useRef, useState } from "react";

// Custom SVG doodle faces — brainrot energy, comic style
const DOODLE_FACES: string[] = [
  // Spiral eyes (overwhelmed)
  `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="36" fill="none" stroke="currentColor" stroke-width="3"/><path d="M25 35 C25 30 30 28 32 32 C34 36 28 38 25 35Z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M55 35 C55 30 50 28 48 32 C46 36 52 38 55 35Z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M28 55 Q40 65 52 55" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>`,

  // Melting face
  `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><path d="M40 4 C60 4 76 20 76 40 C76 55 68 68 56 72 C56 78 48 80 48 74 C44 76 36 76 32 74 C32 80 24 78 24 72 C12 68 4 55 4 40 C4 20 20 4 40 4Z" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="28" cy="34" r="4" fill="currentColor"/><circle cx="52" cy="34" r="4" fill="currentColor"/><path d="M30 50 Q40 58 50 50" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>`,

  // Brain exposed
  `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><path d="M20 45 C10 45 4 38 8 28 C4 20 12 10 22 12 C28 4 42 4 48 8 C56 4 68 8 70 18 C78 22 76 36 68 40 C72 48 64 52 58 48" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M30 20 Q40 28 50 20" fill="none" stroke="currentColor" stroke-width="2" opacity="0.5"/><path d="M25 30 Q40 38 55 30" fill="none" stroke="currentColor" stroke-width="2" opacity="0.5"/><circle cx="30" cy="56" r="3" fill="currentColor"/><circle cx="50" cy="56" r="3" fill="currentColor"/><path d="M34 66 Q40 70 46 66" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M20 45 Q22 55 26 60 Q30 68 34 72 Q40 78 46 72 Q50 68 54 60 Q58 55 60 48" fill="none" stroke="currentColor" stroke-width="3"/></svg>`,

  // Third eye / enlightened
  `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="44" r="32" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="28" cy="44" r="3.5" fill="currentColor"/><circle cx="52" cy="44" r="3.5" fill="currentColor"/><ellipse cx="40" cy="26" rx="8" ry="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="40" cy="26" r="2.5" fill="currentColor"/><path d="M34 58 Q40 62 46 58" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="34" y1="8" x2="36" y2="14" stroke="currentColor" stroke-width="1.5"/><line x1="40" y1="5" x2="40" y2="12" stroke="currentColor" stroke-width="1.5"/><line x1="46" y1="8" x2="44" y2="14" stroke="currentColor" stroke-width="1.5"/></svg>`,

  // Glitch face (offset)
  `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="36" fill="none" stroke="currentColor" stroke-width="3"/><rect x="8" y="32" width="64" height="8" fill="var(--background, #000)"/><circle cx="28" cy="34" r="4" fill="currentColor"/><circle cx="52" cy="34" r="4" fill="currentColor"/><circle cx="32" cy="38" r="3" fill="currentColor" opacity="0.4"/><circle cx="56" cy="38" r="3" fill="currentColor" opacity="0.4"/><path d="M30 54 L36 50 L42 56 L48 48 L54 54" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

  // X eyes (dead/cooked)
  `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="36" fill="none" stroke="currentColor" stroke-width="3"/><line x1="22" y1="28" x2="32" y2="38" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><line x1="32" y1="28" x2="22" y2="38" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><line x1="48" y1="28" x2="58" y2="38" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><line x1="58" y1="28" x2="48" y2="38" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M28 56 Q40 48 52 56" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>`,

  // Star eyes (delulu)
  `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="36" fill="none" stroke="currentColor" stroke-width="3"/><polygon points="27,28 29,34 35,34 30,38 32,44 27,40 22,44 24,38 19,34 25,34" fill="currentColor"/><polygon points="53,28 55,34 61,34 56,38 58,44 53,40 48,44 50,38 45,34 51,34" fill="currentColor"/><path d="M30 55 Q40 64 50 55" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>`,

  // One big eye (unhinged)
  `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="36" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="30" cy="36" r="10" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="30" cy="36" r="4" fill="currentColor"/><circle cx="54" cy="36" r="3" fill="currentColor"/><path d="M32 58 Q40 64 48 58" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>`,

  // Smug face
  `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="36" fill="none" stroke="currentColor" stroke-width="3"/><line x1="22" y1="34" x2="34" y2="34" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><line x1="46" y1="34" x2="58" y2="34" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M28 52 Q40 60 52 52" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><line x1="18" y1="28" x2="34" y2="30" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="62" y1="28" x2="46" y2="30" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,

  // Crown head (main character)
  `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="46" r="30" fill="none" stroke="currentColor" stroke-width="3"/><path d="M18 22 L26 14 L32 22 L40 10 L48 22 L54 14 L62 22 L58 34 L22 34Z" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><circle cx="32" cy="44" r="3.5" fill="currentColor"/><circle cx="48" cy="44" r="3.5" fill="currentColor"/><path d="M34 58 Q40 62 46 58" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
];

const COLORS = [
  "#a855f7", "#ec4899", "#f97316", "#22d3ee",
  "#a78bfa", "#f472b6", "#fb923c", "#67e8f9",
];

interface FloatingItem {
  id: number;
  svg: string;
  color: string;
  left: number;
  duration: number;
  delay: number;
  size: number;
  rotate: number;
}

export function FloatingEmojis() {
  const [items, setItems] = useState<FloatingItem[]>([]);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const floaters: FloatingItem[] = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      svg: DOODLE_FACES[Math.floor(Math.random() * DOODLE_FACES.length)],
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      left: Math.random() * 100,
      duration: 12 + Math.random() * 18,
      delay: Math.random() * 14,
      size: 28 + Math.random() * 20,
      rotate: Math.random() * 360,
    }));
    setItems(floaters);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {items.map((item) => (
        <div
          key={item.id}
          className="floating-emoji"
          style={{
            left: `${item.left}%`,
            width: `${item.size}px`,
            height: `${item.size}px`,
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
            color: item.color,
            filter: `drop-shadow(0 0 6px ${item.color}40)`,
            transform: `rotate(${item.rotate}deg)`,
          }}
          dangerouslySetInnerHTML={{ __html: item.svg }}
        />
      ))}
    </div>
  );
}
