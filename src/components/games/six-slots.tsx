import { useState } from "react";
import { Button } from "@/components/ui/button";
import { makeSixPuzzles, type GameConfig, type SixPuzzle } from "@/lib/game-factory";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

export function SixSlots({
  config,
  onExit,
}: {
  config: GameConfig;
  onExit: () => void;
}) {
  const recordRound = useProgress((s) => s.recordRound);
  const [puzzles] = useState<SixPuzzle[]>(() => makeSixPuzzles(config));
  const [i, setI] = useState(0);
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const puzzle = puzzles[i];

  function place(bankId: string) {
    if (!selectedSlot || checked) return;
    setPlaced((p) => ({ ...p, [selectedSlot]: bankId }));
    setSelectedSlot(null);
  }

  function check() {
    if (!puzzle) return;
    const correct = puzzle.slots.every((s) => {
      const chip = puzzle.bank.find((b) => b.id === placed[s.key]);
      return chip?.text === s.answer;
    });
    if (correct) setScore((n) => n + 1);
    setChecked(true);
  }

  function next() {
    if (i + 1 >= puzzles.length) {
      setDone(true);
      recordRound({
        mode: "six",
        score,
        total: puzzles.length,
        at: Date.now(),
        preset: config.familyIds.join(","),
      });
      return;
    }
    setI((n) => n + 1);
    setPlaced({});
    setSelectedSlot(null);
    setChecked(false);
  }

  if (!puzzle || done) {
    return (
      <div className="space-y-4">
        <h1 className="font-display text-2xl font-semibold">Six slots</h1>
        <p>
          {score} / {puzzles.length} families placed correctly.
        </p>
        <Button onClick={onExit}>New game</Button>
      </div>
    );
  }

  const used = new Set(Object.values(placed));

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight">Six slots</h1>
        <p className="text-sm text-muted">
          Place the six memory forms for <span className="text-fg font-medium">{puzzle.title}</span>
        </p>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {puzzle.slots.map((slot) => {
          const chip = puzzle.bank.find((b) => b.id === placed[slot.key]);
          const value = chip?.text;
          const ok = checked && value === slot.answer;
          const bad = checked && value !== slot.answer;
          return (
            <button
              key={slot.key}
              type="button"
              onClick={() => !checked && setSelectedSlot(slot.key)}
              className={cn(
                "min-h-16 rounded-lg border px-3 py-2 text-left",
                selectedSlot === slot.key && "ring-2 ring-primary/40 border-primary",
                ok && "border-ok bg-ok/10",
                bad && "border-danger bg-danger/10",
                !ok && !bad && "border-border bg-card",
              )}
            >
              <p className="text-xs uppercase tracking-wide text-muted">{slot.label}</p>
              <p className="font-serif text-xl">{value ?? "—"}</p>
              {bad ? <p className="text-xs text-ok">Answer: {slot.answer}</p> : null}
            </button>
          );
        })}
      </div>

      <div>
        <p className="mb-2 text-xs uppercase tracking-wide text-muted">Bank</p>
        <div className="flex flex-wrap gap-2">
          {puzzle.bank.map((chip) => {
            const taken = used.has(chip.id);
            return (
              <button
                key={chip.id}
                type="button"
                disabled={taken || !selectedSlot || checked}
                onClick={() => place(chip.id)}
                className={cn(
                  "min-h-11 rounded-md border px-3 font-serif text-lg",
                  taken
                    ? "border-border text-subtle"
                    : "border-border-strong bg-bg-elevated hover:bg-bg-subtle",
                )}
              >
                {chip.text}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {!checked ? (
          <Button onClick={check} disabled={puzzle.slots.some((s) => !placed[s.key])}>
            Check
          </Button>
        ) : (
          <Button onClick={next}>{i + 1 >= puzzles.length ? "See score" : "Next family"}</Button>
        )}
        <Button variant="ghost" onClick={onExit}>
          Back to studio
        </Button>
      </div>
    </div>
  );
}
