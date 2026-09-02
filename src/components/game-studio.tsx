import { useMemo, useState } from "react";
import { Flashcards } from "@/components/games/flashcards";
import { IdentifyGame } from "@/components/games/identify";
import { MemoryMatch } from "@/components/games/memory-match";
import { SixSlots } from "@/components/games/six-slots";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { GameConfig } from "@/lib/game-factory";
import { FAMILIES, PRESETS, type Category } from "@/lib/participles";
import type { GameMode } from "@/lib/progress";
import { cn } from "@/lib/utils";

const MODES: { id: GameMode; title: string; body: string }[] = [
  {
    id: "match",
    title: "Memory match",
    body: "Flip cards. Pair a Greek form with its parse.",
  },
  {
    id: "identify",
    title: "Identify",
    body: "See one form. Choose the correct parse from four options.",
  },
  {
    id: "flash",
    title: "Flashcards",
    body: "Six memory forms on the front, tense and markers on the back.",
  },
  {
    id: "six",
    title: "Six slots",
    body: "Place nom. and gen. singular endings into the six slots.",
  },
];

const TONE: Record<Category, "active" | "middle" | "passive" | "perfect"> = {
  active: "active",
  middle: "middle",
  passive: "passive",
  perfect: "perfect",
};

export function GameStudio() {
  const [mode, setMode] = useState<GameMode>("match");
  const [ids, setIds] = useState<string[]>(PRESETS[0]?.ids ?? ["pres-act"]);
  const [depth, setDepth] = useState<GameConfig["depth"]>("memory");
  const [size, setSize] = useState(8);
  const [running, setRunning] = useState<GameConfig | null>(null);

  const config = useMemo<GameConfig>(
    () => ({
      mode,
      familyIds: ids,
      depth,
      pairCount: size,
      questionCount: mode === "six" ? Math.min(size, ids.length || 1) : size,
    }),
    [mode, ids, depth, size],
  );

  function toggle(id: string) {
    setIds((curr) =>
      curr.includes(id) ? curr.filter((x) => x !== id) : [...curr, id],
    );
  }

  if (running) {
    const exit = () => setRunning(null);
    if (running.mode === "match") return <MemoryMatch config={running} onExit={exit} />;
    if (running.mode === "identify") return <IdentifyGame config={running} onExit={exit} />;
    if (running.mode === "flash") return <Flashcards config={running} onExit={exit} />;
    return <SixSlots config={running} onExit={exit} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Game studio</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Build a round from the chart: pick families, pick a mode, then play.
          Scores stay on this device.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Mode</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id)}
              className={cn(
                "rounded-xl border p-4 text-left min-h-24",
                mode === m.id
                  ? "border-primary bg-primary/8"
                  : "border-border bg-card hover:bg-bg-subtle",
              )}
            >
              <p className="font-semibold">{m.title}</p>
              <p className="mt-1 text-sm text-muted">{m.body}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
          Material
        </h2>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setIds(p.ids)}
              className={cn(
                "min-h-11 rounded-full border px-3 text-sm",
                ids.join() === p.ids.join()
                  ? "border-primary bg-primary text-primary-fg"
                  : "border-border bg-card text-fg",
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {FAMILIES.map((f) => {
            const on = ids.includes(f.id);
            return (
              <label
                key={f.id}
                className={cn(
                  "flex min-h-14 cursor-pointer items-center gap-3 rounded-lg border px-3 py-2",
                  on ? "border-primary/40 bg-card" : "border-border bg-card",
                )}
              >
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() => toggle(f.id)}
                  className="size-4 accent-primary"
                />
                <span className="flex-1">
                  <span className="font-medium">{f.tenseVoice}</span>{" "}
                  <Badge tone={TONE[f.category]}>{f.pattern}</Badge>
                  <span className="mt-0.5 block font-serif text-sm text-muted">
                    {f.example}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm font-semibold">Depth</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <Button
              variant={depth === "memory" ? "default" : "outline"}
              onClick={() => setDepth("memory")}
            >
              Memory forms
            </Button>
            <Button
              variant={depth === "full" ? "default" : "outline"}
              onClick={() => setDepth("full")}
            >
              Full paradigm
            </Button>
          </div>
          <p className="mt-2 text-xs text-muted">
            Memory forms use nom. + gen. singular. Full paradigm includes all cases.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm font-semibold">Round size</p>
          <div className="mt-2 flex gap-2">
            {[6, 8, 12].map((n) => (
              <Button
                key={n}
                variant={size === n ? "default" : "outline"}
                onClick={() => setSize(n)}
              >
                {n}
              </Button>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted">
            Pairs for match, questions for identify, families for flash and six slots.
          </p>
        </div>
      </section>

      <Button
        size="lg"
        disabled={ids.length === 0}
        onClick={() => setRunning(config)}
      >
        Start {MODES.find((m) => m.id === mode)?.title.toLowerCase()}
      </Button>
    </div>
  );
}
