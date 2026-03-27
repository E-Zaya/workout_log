import DashboardClient from "@/components/dashboard/DashboardClient";
import { prisma } from "@/lib/prisma";
import { getCalendarStats, getWeeklyVolumes } from "@/lib/queries/workout";
import type { ExerciseOption } from "@/types/workout";

export const dynamic = "force-dynamic";

function normalizeExerciseName(name: string) {
  const cleaned = name.trim().toLowerCase() === "squad" ? "squat" : name.trim();

  return cleaned
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

export default async function HomePage() {
  const userId = 1;

  const rawExercises = await prisma.exercise.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
    },
  });

  const exercises: ExerciseOption[] = rawExercises.map((exercise) => ({
    ...exercise,
    name: normalizeExerciseName(exercise.name),
  }));

  const calendarStats = await getCalendarStats(userId);
  const weeklyVolumes = await getWeeklyVolumes(userId);
  const thisWeekTotal = weeklyVolumes.at(-1)?.total ?? 0;

  return (
    <DashboardClient
      userId={userId}
      exercises={exercises}
      calendarStats={calendarStats}
      weeklyVolumes={weeklyVolumes}
      thisWeekTotal={thisWeekTotal}
    />
  );
}