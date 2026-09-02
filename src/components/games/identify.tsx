import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { makeIdentifyRound, type GameConfig, type IdentifyQ } from "@/lib/game-factory";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

export function IdentifyGame({
  config,
  onExit,
}: {
  config: GameConfig;
  onExit: () => void;
}) {
  const recordRound = useProgress((s) => s.recordRound);
  const [qs] = useState<IdentifyQ[]>(() => makeIdentifyRound(config));
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = qs[i];
  const remaining = qs.length - i;

  const status = useMemo(() => {
    if (!picked || !q) return null;
    return picked === q.answer;
  }, [picked, q]);

  function choose(choice: string) {
    if (picked || !q) return;
    setPicked(choice);
    if (choice === q.answer) setScore((s) => s + 1);
  }

  function next() {
    if (!q) return;
    if (i + 1 >= qs.length) {
      setDone(true);
      recordRound({
        mode: "identify",
        score,
        total: qs.length,
        at: Date.now(),
        preset: config.familyIds.join(","),
      });
      return;
    }
    setI((n) => n + 1);
    setPicked(null);
  }

  if (!q || done) {
    return (
      <div className="space-y-4">
        <h1 className="font-display text-2xl font-semibold">Identify</h1>
        <p className="text-lg">
          Score <span className="tabular-nums font-semibold">{score}</span> / {qs.length}
        </p>
        <div className="flex gap-2">
          <Button onClick={onExit}>New game</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">Identify</h1>
          <p className="text-sm text-muted">Parse the form. {remaining} left.</p>
        </div>
        <p className="tabular-nums text-sm text-muted">
          {score} correct
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 text-center shadow-[var(--shadow-border)]">
        <p className="font-serif text-4xl">{q.prompt.greek}</p>
        <p className="mt-2 text-sm text-muted">Choose the parse</p>
      </div>

      <div className="grid gap-2">
        {q.choices.map((choice) => {
          const show = Boolean(picked);
          const isAnswer = choice === q.answer;
          const isPick = choice === picked;
          return (
            <button
              key={choice}
              type="button"
              onClick={() => choose(choice)}
              className={cn(
                "min-h-12 rounded-lg border px-4 py-3 text-left text-sm transition-colors duration-150",
                !show && "border-border bg-card hover:bg-bg-subtle",
                show && isAnswer && "border-ok bg-ok/10 text-ok",
                show && isPick && !isAnswer && "border-danger bg-danger/10 text-danger",
                show && !isAnswer && !isPick && "border-border bg-card text-muted",
              )}
            >
              {choice}
            </button>
          );
        })}
      </div>

      {picked ? (
        <Button onClick={next}>{i + 1 >= qs.length ? "See score" : "Next"}</Button>
      ) : (
        <Button variant="ghost" onClick={onExit}>
          Back to studio
        </Button>
      )}
      {status === false ? (
        <p className="text-sm text-danger">Correct parse: {q.answer}</p>
      ) : null}
    </div>
  );
}
