"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brain, Trophy, Clock } from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Score", icon: Brain },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/history", label: "History", icon: Clock },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 backdrop-blur-xl border-t md:static md:border-t-0 md:border-b" style={{ background: "var(--nav-bg)", borderColor: "var(--panel-border)" }}>
      <div className="flex items-center justify-center gap-1 px-4 py-2 md:py-3">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                active
                  ? "bg-purple-600/20 text-purple-300 shadow-lg shadow-purple-500/10"
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
