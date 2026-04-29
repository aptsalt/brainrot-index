"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brain, Trophy, ClockCounterClockwise } from "@phosphor-icons/react/dist/ssr";

const NAV_ITEMS = [
  { href: "/", label: "Score", icon: Brain },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/history", label: "History", icon: ClockCounterClockwise },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 backdrop-blur-xl border-t md:static md:border-t-0 md:border-b"
      style={{ background: "var(--nav-bg)", borderColor: "var(--panel-border)" }}
    >
      <div className="flex items-center justify-center gap-1 px-4 py-2 md:py-3">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all"
              style={{
                color: active ? "var(--nav-active)" : "var(--nav-inactive)",
                background: active ? "var(--badge-bg)" : "transparent",
              }}
            >
              <item.icon weight={active ? "fill" : "regular"} className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
