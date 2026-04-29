"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("brainrot-theme");
    if (saved === "light") {
      setDark(false);
      document.documentElement.classList.add("light");
    }
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.classList.remove("light");
      localStorage.setItem("brainrot-theme", "dark");
    } else {
      document.documentElement.classList.add("light");
      localStorage.setItem("brainrot-theme", "light");
    }
  };

  return (
    <button
      onClick={toggle}
      className="fixed top-3 right-3 z-50 w-9 h-9 flex items-center justify-center rounded-lg border-2 transition-all cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,0.3)] hover:shadow-[1px_1px_0px_rgba(0,0,0,0.3)] hover:translate-x-px hover:translate-y-px bg-zinc-900 border-zinc-700 text-zinc-400 hover:text-zinc-200 light:bg-amber-50 light:border-amber-300 light:text-amber-700"
      aria-label="Toggle theme"
    >
      {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}
