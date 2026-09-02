import { useState } from "react";
import { Button } from "@/components/ui/button";
import { makeFlashCards, type GameConfig } from "@/lib/game-factory";
import { useProgress } from "@/lib/progress";

export function Flashcards({
  config,
  onExit,
}: {
  config: GameConfig;
  onExit: () => void;
}) {
  const markFlash = useProgress((s) => s.markFlash);
  const recordRound = useProgress((s) => s.recordRound);
  const knownSet = useProgress((s) => s.flashKnown);
  const [cards] = useState(() => makeFlashCards(config));
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);
  const [done, setDone] = useState(false);

  const card = cards[i];

  function grade(didKnow: boolean) {
    if (!card) return;
    if (didKnow) {
      setKnown((n) => n + 1);
      markFlash(card.familyId, true);
    } else {
      markFlash(card.familyId, false);
    }
    if (i + 1 >= cards.length) {
      const score = known + (didKnow ? 1 : 0);
      setDone(true);
      recordRound({
        mode: "flash",
        score,
        total: cards.length,
        at: Date.now(),
        preset: config.familyIds.join(","),
      });
      return;
    }
    setI((n) => n + 1);
    setFlipped(false);
  }

  if (!card || done) {
    return (
      <div className="space-y-4">
        <h1 className="font-display text-2xl font-semibold">Flashcards</h1>
        <p>
          Knew {known} of {cards.length} families this round.
        </p>
        <Button onClick={onExit}>New game</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">Flashcards</h1>
          <p className="text-sm text-muted">
            Six memory forms. {i + 1} / {cards.length}
          </p>
        </div>
        <p className="text-sm tabular-nums text-muted">{known} known</p>
      </div>

      <button
        type="button"
        onClick={() => setFlipped((v) => !v)}
        className="w-full rounded-xl border border-border bg-card p-8 text-center shadow-[var(--shadow-border)] min-h-52"
      >
        {flipped ? (
          <pre className="font-sans text-lg font-medium leading-relaxed whitespace-pre-wrap">
            {card.back}
          </pre>
        ) : (
          <pre className="font-serif text-2xl leading-relaxed whitespace-pre-wrap">
            {card.front}
          </pre>
        )}
        <p className="mt-6 text-xs uppercase tracking-widest text-muted">
          {flipped ? "Tap to hide" : "Tap to reveal"}
        </p>
      </button>

      {flipped ? (
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" onClick={() => grade(false)}>
            Still learning
          </Button>
          <Button onClick={() => grade(true)}>Knew it</Button>
        </div>
      ) : (
        <Button variant="ghost" onClick={onExit}>
          Back to studio
        </Button>
      )}

      {knownSet.includes(card.familyId) ? (
        <p className="text-sm text-ok">Marked known in earlier rounds.</p>
      ) : null}
    </div>
  );
}
