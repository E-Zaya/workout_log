import Link from "next/link";
import Image from "next/image";
import AddTrainingForm from "@/components/training/AddTrainingForm";
import SummaryCards from "@/components/dashboard/SummaryCards";
import WeeklyVolumeList from "@/components/dashboard/WeeklyVolumeList";
import CalendarSection from "@/components/dashboard/CalendarSection";
import ManageExercises from "@/components/training/ManageExercises";
import { prisma } from "@/lib/prisma";
import { getCalendarStats, getWeeklyVolumes } from "@/lib/queries/workout";

export default async function HomePage() {
  const userId = 1;

  const exercises = await prisma.exercise.findMany({
    orderBy: { name: "asc" },
  });

  const calendarStats = await getCalendarStats(userId);
  const weeklyVolumes = await getWeeklyVolumes(userId);

  const thisWeekTotal = weeklyVolumes[0]?.total ?? 0;

  return (
    <main className="min-h-screen text-white">
      <div className="app-shell">
        <section className="hero-card">
          <div className="hero-bg">
            <Image
              src="/hero-gym.png"
              alt="Gym background"
              fill
              priority
              className="object-cover object-center"
            />
          </div>

          <div className="hero-overlay" />

          <div className="hero-grid">
            <div className="flex flex-col justify-between">
              <div className="space-y-5">
                <p className="hero-kicker">Workout Tracker</p>

                <h1 className="hero-title">
                  Build a body of proof,
                  <span className="block text-red-400">not just motivation.</span>
                </h1>

                <p className="hero-copy">
                  Track your workouts, monitor weekly total volume, and review your
                  best lifts in one focused dashboard built for consistency.
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <Link href="/log" className="primary-btn">
                    View Log
                  </Link>
                  <Link href="/best" className="secondary-btn">
                    My Best
                  </Link>
                </div>
              </div>

              <div className="hero-stat-grid">
                <div className="hero-stat-card">
                  <p className="stat-label">Monthly Active Days</p>
                  <p className="stat-value">{calendarStats.monthlyActiveDays}</p>
                </div>

                <div className="hero-stat-card">
                  <p className="stat-label">Total Active Days</p>
                  <p className="stat-value">{calendarStats.totalActiveDays}</p>
                </div>

                <div className="hero-stat-card">
                  <p className="stat-label">This Week Total</p>
                  <p className="stat-value">{thisWeekTotal} kg</p>
                </div>
              </div>
            </div>

            <div className="hero-panel self-end">
              <AddTrainingForm exercises={exercises} userId={userId} />
              <ManageExercises exercises={exercises} />
            </div>
          </div>
        </section>
          <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
            <WeeklyVolumeList items={weeklyVolumes} />
            <CalendarSection
              activeDates={calendarStats.activeDates}
              monthlyActiveDays={calendarStats.monthlyActiveDays}
              totalActiveDays={calendarStats.totalActiveDays}
            />
          </div>
      </div>
    </main>
  );
}