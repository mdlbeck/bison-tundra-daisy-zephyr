import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { GameStudio } from "@/components/game-studio";

export const Route = createFileRoute("/play")({ component: Play });

function Play() {
  return (
    <AppShell active="games">
      <GameStudio />
    </AppShell>
  );
}
