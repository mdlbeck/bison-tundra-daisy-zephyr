import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { FAMILIES, type Category, type Family } from "@/lib/participles";

const TONE: Record<Category, "active" | "middle" | "passive" | "perfect"> = {
  active: "active",
  middle: "middle",
  passive: "passive",
  perfect: "perfect",
};

const CASES = [
  ["Nom Sg", "nomSg"],
  ["Gen Sg", "genSg"],
  ["Dat Sg", "datSg"],
  ["Acc Sg", "accSg"],
  ["Nom Pl", "nomPl"],
  ["Gen Pl", "genPl"],
  ["Dat Pl", "datPl"],
  ["Acc Pl", "accPl"],
] as const;

function FamilyBlock({ family }: { family: Family }) {
  const [open, setOpen] = useState(false);
  return (
    <section className="rounded-xl border border-border bg-card shadow-[var(--shadow-border)]">
      <button
        type="button"
        className="flex w-full items-start justify-between gap-3 px-4 py-3 text-left"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <div>
          <p className="font-semibold">
            {family.tenseVoice}{" "}
            <Badge tone={TONE[family.category]}>{family.pattern}</Badge>
          </p>
          <p className="mt-1 font-serif text-lg leading-tight">
            {family.nom.join(" / ")}
          </p>
          <p className="font-serif text-muted">{family.gen.join(" / ")}</p>
        </div>
        <span className="pt-1 text-sm text-muted">{open ? "Hide" : "Full"}</span>
      </button>
      {open ? (
        <div className="border-t border-border px-3 pb-4 pt-2">
          <p className="mb-2 text-sm text-muted">
            {family.lemma} ({family.lemmaGloss}) · {family.notes} · {family.markers}
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[28rem] text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wide text-muted">
                  <th className="py-2 pr-2 font-medium">Case</th>
                  <th className="py-2 pr-2 font-medium">Masculine</th>
                  <th className="py-2 pr-2 font-medium">Feminine</th>
                  <th className="py-2 font-medium">Neuter</th>
                </tr>
              </thead>
              <tbody>
                {CASES.map(([label, key]) => (
                  <tr key={key} className="border-t border-border">
                    <td className="py-1.5 pr-2 text-xs font-semibold text-muted">
                      {label}
                    </td>
                    {family.paradigm[key].map((cell) => (
                      <td key={cell + key} className="py-1.5 pr-2 font-serif text-base">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export function ChartView() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">
          Memory chart
        </h1>
        <p className="mt-2 max-w-2xl text-muted">
          Memorize nominative singular (M/F/N) plus genitive singular. Everything
          else follows regular 3-1-3 or 2-1-2 endings. Expand a family for the
          full paradigm.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-[var(--shadow-border)]">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <thead className="bg-ink text-primary-fg">
            <tr>
              <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wide">
                Tense / Voice
              </th>
              <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wide">
                Nom. Sg.
              </th>
              <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wide">
                Gen. Sg.
              </th>
              <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wide">
                Markers
              </th>
            </tr>
          </thead>
          <tbody>
            {FAMILIES.map((f) => (
              <tr key={f.id} className="border-t border-border">
                <td className="px-3 py-2.5">
                  <span className="font-medium">{f.tenseVoice}</span>{" "}
                  <Badge tone={TONE[f.category]}>{f.pattern}</Badge>
                </td>
                <td className="px-3 py-2.5 font-serif text-base">{f.nom.join(" / ")}</td>
                <td className="px-3 py-2.5 font-serif text-base">{f.gen.join(" / ")}</td>
                <td className="px-3 py-2.5 font-mono text-xs text-muted">{f.markers}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3">
        {FAMILIES.map((family) => (
          <FamilyBlock key={family.id} family={family} />
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-4">
          <h2 className="font-semibold">3-1-3 pattern</h2>
          <p className="mt-1 text-sm text-muted">
            All Active forms and both Aorist Passives, like πᾶς, πᾶσα, πᾶν.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <h2 className="font-semibold">2-1-2 pattern</h2>
          <p className="mt-1 text-sm text-muted">
            All Middle / Mid-Pass forms, like καλός, καλή, καλόν.
          </p>
        </div>
      </div>
    </div>
  );
}
