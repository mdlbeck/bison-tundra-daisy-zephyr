import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { ChartView } from "@/components/chart-view";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <AppShell active="chart">
      <ChartView />
    </AppShell>
  );
}
