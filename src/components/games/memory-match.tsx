import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { makeMatchPairs, type GameConfig } from "@/lib/game-factory";
import { useProgress } from "@/lib/progress";
import { shuffle } from "@/lib/utils";

type Card = {
  key: string;
  pairId: string;
  face: "greek" | "label";
  text: string;
};

function buildDeck(config: GameConfig): Card[] {
  const pairs = makeMatchPairs(config);
  const cards: Card[] = [];
  for (const p of pairs) {
    cards.push({ key: `${p.id}-g`, pairId: p.id, face: "greek", text: p.greek });
    cards.push({ key: `${p.id}-l`, pairId: p.id, face: "label", text: p.label });
  }
  return shuffle(cards);
}

export function MemoryMatch({
  config,
  onExit,
}: {
  config: GameConfig;
  onExit: () => void;
}) {
  const recordRound = useProgress((s) => s.recordRound);
  const [deck, setDeck] = useState(() => buildDeck(config));
  const [open, setOpen] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [wrong, setWrong] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [lock, setLock] = useState(false);
  const [done, setDone] = useState(false);

  const totalPairs = useMemo(() => deck.length / 2, [deck.length]);
  const score = matched.length / 2;

  function flip(key: string) {
    if (lock || matched.includes(key) || open.includes(key) || done) return;
    const next = [...open, key];
    setOpen(next);
    if (next.length < 2) return;
    setLock(true);
    setMoves((m) => m + 1);
    const a = deck.find((c) => c.key === next[0]);
    const b = deck.find((c) => c.key === next[1]);
    if (a && b && a.pairId === b.pairId) {
      const nowMatched = [...matched, a.key, b.key];
      setMatched(nowMatched);
      setOpen([]);
      setLock(false);
      if (nowMatched.length === deck.length) {
        setDone(true);
        recordRound({
          mode: "match",
          score: totalPairs,
          total: totalPairs,
          at: Date.now(),
          preset: config.familyIds.join(","),
        });
      }
    } else {
      setWrong(next);
      window.setTimeout(() => {
        setOpen([]);
        setWrong([]);
        setLock(false);
      }, 750);
    }
  }

  function restart() {
    setDeck(buildDeck(config));
    setOpen([]);
    setMatched([]);
    setWrong([]);
    setMoves(0);
    setLock(false);
    setDone(false);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">Memory match</h1>
          <p className="text-sm text-muted">Pair each Greek form with its parse.</p>
        </div>
        <p className="tabular-nums text-sm text-muted">
          {score}/{totalPairs} · {moves} moves
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {deck.map((card) => {
          const isUp = open.includes(card.key) || matched.includes(card.key);
          const isWrong = wrong.includes(card.key);
          const isMatch = matched.includes(card.key);
          return (
            <button
              key={card.key}
              type="button"
              onClick={() => flip(card.key)}
              className="min-h-24 rounded-lg border p-3 text-left transition-transform duration-150 active:scale-[0.98]"
              style={{
                background: isMatch
                  ? "color-mix(in oklab, var(--color-ok) 12%, var(--color-card))"
                  : isWrong
                    ? "color-mix(in oklab, var(--color-danger) 12%, var(--color-card))"
                    : isUp
                      ? "var(--color-card)"
                      : "var(--color-ink)",
                color: isUp ? "var(--color-fg)" : "var(--color-primary-fg)",
                borderColor: isMatch ? "var(--color-ok)" : "var(--color-border)",
              }}
            >
              {isUp ? (
                <span
                  className={
                    card.face === "greek" ? "font-serif text-lg leading-tight" : "text-sm leading-snug"
                  }
                >
                  {card.text}
                </span>
              ) : (
                <span className="text-xs uppercase tracking-widest text-primary-fg/70">Metochē</span>
              )}
            </button>
          );
        })}
      </div>

      {done ? (
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="font-semibold">Board cleared in {moves} moves.</p>
          <div className="mt-3 flex gap-2">
            <Button onClick={restart}>Play again</Button>
            <Button variant="outline" onClick={onExit}>
              New game
            </Button>
          </div>
        </div>
      ) : (
        <Button variant="ghost" onClick={onExit}>
          Back to studio
        </Button>
      )}
    </div>
  );
}
