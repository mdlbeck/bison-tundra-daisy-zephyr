import {
  allParseItems,
  familiesFromIds,
  memoryItems,
  type Family,
  type ParseItem,
} from "@/lib/participles";
import { pick, shuffle } from "@/lib/utils";
import type { GameMode } from "@/lib/progress";

export type GameConfig = {
  mode: GameMode;
  familyIds: string[];
  depth: "memory" | "full";
  pairCount: number;
  questionCount: number;
};

export function familiesFor(config: GameConfig): Family[] {
  const list = familiesFromIds(config.familyIds);
  return list.length ? list : familiesFromIds(["pres-act"]);
}

export function itemsFor(config: GameConfig): ParseItem[] {
  const families = familiesFor(config);
  return config.depth === "full" ? allParseItems(families) : memoryItems(families);
}

export type MatchPair = {
  id: string;
  greek: string;
  label: string;
};

export function makeMatchPairs(config: GameConfig): MatchPair[] {
  const items = itemsFor(config);
  const unique = new Map<string, ParseItem>();
  for (const item of items) {
    if (!unique.has(item.greek)) unique.set(item.greek, item);
  }
  return pick([...unique.values()], config.pairCount).map((item) => ({
    id: item.id,
    greek: item.greek,
    label: item.parse,
  }));
}

export type IdentifyQ = {
  prompt: ParseItem;
  choices: string[];
  answer: string;
};

export function makeIdentifyRound(config: GameConfig): IdentifyQ[] {
  const items = itemsFor(config);
  const pool = pick(items, config.questionCount);
  const labels = [...new Set(items.map((i) => i.parse))];
  return pool.map((prompt) => {
    const distractors = shuffle(labels.filter((l) => l !== prompt.parse)).slice(0, 3);
    const choices = shuffle([prompt.parse, ...distractors]);
    return { prompt, choices, answer: prompt.parse };
  });
}

export type FlashCard = {
  id: string;
  front: string;
  back: string;
  familyId: string;
};

export function makeFlashCards(config: GameConfig): FlashCard[] {
  const families = familiesFor(config);
  return shuffle(
    families.map((f) => ({
      id: f.id,
      front: `${f.nom.join("  ·  ")}\n${f.gen.join("  ·  ")}`,
      back: `${f.tenseVoice}\n${f.markers}\n${f.notes}`,
      familyId: f.id,
    })),
  );
}

export type SixPuzzle = {
  familyId: string;
  title: string;
  slots: { key: string; label: string; answer: string }[];
  bank: { id: string; text: string }[];
};

export function makeSixPuzzles(config: GameConfig): SixPuzzle[] {
  const families = shuffle(familiesFor(config)).slice(0, config.questionCount);
  const allEndings = familiesFor(config).flatMap((f) => [...f.nom, ...f.gen]);
  return families.map((f) => {
    const slots = [
      { key: "nm", label: "Nom. masc.", answer: f.nom[0] ?? "" },
      { key: "nf", label: "Nom. fem.", answer: f.nom[1] ?? "" },
      { key: "nn", label: "Nom. neut.", answer: f.nom[2] ?? "" },
      { key: "gm", label: "Gen. masc.", answer: f.gen[0] ?? "" },
      { key: "gf", label: "Gen. fem.", answer: f.gen[1] ?? "" },
      { key: "gn", label: "Gen. neut.", answer: f.gen[2] ?? "" },
    ];
    const distractors = shuffle(
      allEndings.filter((e) => !slots.some((s) => s.answer === e)),
    ).slice(0, 4);
    const bankTexts = shuffle([...slots.map((s) => s.answer), ...distractors]);
    return {
      familyId: f.id,
      title: f.tenseVoice,
      slots,
      bank: bankTexts.map((text, n) => ({ id: `${f.id}-b${n}`, text })),
    };
  });
}
