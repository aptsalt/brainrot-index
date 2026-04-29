"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "@phosphor-icons/react/dist/ssr";

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
      className="fixed top-3 right-3 z-50 w-9 h-9 flex items-center justify-center rounded-lg border-2 transition-all cursor-pointer shadow-[2px_2px_0px_var(--panel-shadow)] hover:shadow-[1px_1px_0px_var(--panel-shadow)] hover:translate-x-px hover:translate-y-px"
      style={{
        background: "var(--panel-bg)",
        borderColor: "var(--panel-border)",
        color: "var(--muted-strong)",
      }}
      aria-label="Toggle theme"
    >
      {dark ? (
        <Sun weight="fill" className="w-5 h-5" />
      ) : (
        <Moon weight="fill" className="w-5 h-5" />
      )}
    </button>
  );
}
