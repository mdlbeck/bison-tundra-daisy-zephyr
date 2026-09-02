import { create } from "zustand";
import { persist } from "zustand/middleware";

const SAVE_VERSION = 1;

export type GameMode = "match" | "identify" | "flash" | "six";

export type RoundRecord = {
  mode: GameMode;
  score: number;
  total: number;
  at: number;
  preset: string;
};

type ProgressState = {
  version: number;
  rounds: RoundRecord[];
  best: Record<GameMode, number>;
  flashKnown: string[];
  recordRound: (round: RoundRecord) => void;
  markFlash: (id: string, known: boolean) => void;
};

const emptyBest: Record<GameMode, number> = {
  match: 0,
  identify: 0,
  flash: 0,
  six: 0,
};

export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      version: SAVE_VERSION,
      rounds: [],
      best: { ...emptyBest },
      flashKnown: [],
      recordRound: (round) =>
        set((s) => ({
          rounds: [round, ...s.rounds].slice(0, 40),
          best: {
            ...s.best,
            [round.mode]: Math.max(s.best[round.mode] ?? 0, round.score),
          },
        })),
      markFlash: (id, known) =>
        set((s) => {
          const setIds = new Set(s.flashKnown);
          if (known) setIds.add(id);
          else setIds.delete(id);
          return { flashKnown: [...setIds] };
        }),
    }),
    {
      name: "metoche-progress",
      version: SAVE_VERSION,
      migrate: (persisted) => {
        const p = persisted as Partial<ProgressState>;
        return {
          version: SAVE_VERSION,
          rounds: Array.isArray(p.rounds) ? p.rounds : [],
          best: { ...emptyBest, ...(p.best ?? {}) },
          flashKnown: Array.isArray(p.flashKnown) ? p.flashKnown : [],
          recordRound: () => {},
          markFlash: () => {},
        };
      },
    },
  ),
);
