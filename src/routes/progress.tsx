import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/progress")({ component: ProgressPage });

const MODE_LABEL = {
  match: "Memory match",
  identify: "Identify",
  flash: "Flashcards",
  six: "Six slots",
} as const;

function ProgressPage() {
  const rounds = useProgress((s) => s.rounds);
  const best = useProgress((s) => s.best);
  const known = useProgress((s) => s.flashKnown);

  return (
    <AppShell active="progress">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Progress</h1>
          <p className="mt-2 text-muted">Stored on this device only.</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {(Object.keys(MODE_LABEL) as Array<keyof typeof MODE_LABEL>).map((mode) => (
            <div key={mode} className="rounded-xl border border-border bg-card p-4">
              <p className="text-xs uppercase tracking-wide text-muted">{MODE_LABEL[mode]}</p>
              <p className="mt-1 font-display text-2xl tabular-nums">{best[mode]}</p>
              <p className="text-xs text-muted">best score</p>
            </div>
          ))}
        </div>

        <p className="text-sm text-muted">
          Flash families marked known: {known.length}
        </p>

        <section>
          <h2 className="font-semibold">Recent rounds</h2>
          {rounds.length === 0 ? (
            <p className="mt-2 text-sm text-muted">No rounds yet. Open Games to build one.</p>
          ) : (
            <ul className="mt-3 divide-y divide-border rounded-xl border border-border bg-card">
              {rounds.slice(0, 12).map((r) => (
                <li key={r.at} className="flex items-center justify-between gap-3 px-4 py-3">
                  <div>
                    <p className="font-medium">{MODE_LABEL[r.mode]}</p>
                    <p className="text-xs text-muted">
                      {new Date(r.at).toLocaleString()}
                    </p>
                  </div>
                  <p className="tabular-nums text-sm">
                    {r.score}/{r.total}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <Button
          variant="outline"
          onClick={() => {
            try {
              localStorage.removeItem("metoche-progress");
              window.location.reload();
            } catch {
              window.location.reload();
            }
          }}
        >
          Clear local progress
        </Button>
      </div>
    </AppShell>
  );
}
