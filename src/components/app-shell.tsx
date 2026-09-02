import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Chart" },
  { to: "/play", label: "Games" },
  { to: "/progress", label: "Progress" },
] as const;

export function AppShell({
  children,
  active,
}: {
  children: ReactNode;
  active: "chart" | "games" | "progress";
}) {
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="sticky top-0 z-20 border-b border-border bg-bg/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="min-w-0">
            <p className="font-display text-lg font-semibold tracking-tight text-ink">
              Metochē
            </p>
            <p className="truncate text-xs text-muted">Koine participle trainer</p>
          </Link>
          <nav className="flex gap-1">
            {NAV.map((item) => {
              const isActive =
                (active === "chart" && item.to === "/") ||
                (active === "games" && item.to.startsWith("/play")) ||
                (active === "progress" && item.to === "/progress");
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium min-h-11 inline-flex items-center",
                    isActive
                      ? "bg-bg-subtle text-fg"
                      : "text-muted hover:bg-bg-subtle hover:text-fg",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-6 pb-16">{children}</main>
    </div>
  );
}
