import Link from "next/link";
import WorkoutLogList from "@/components/log/WorkoutLogList";
import { getWorkoutLogs } from "@/lib/queries/workout";

type LogPageProps = {
  searchParams?: Promise<{
    date?: string;
  }>;
};

export default async function LogPage({ searchParams }: LogPageProps) {
  const userId = 1;
  const resolvedSearchParams = await searchParams;
  const selectedDate = resolvedSearchParams?.date;

  const logs = await getWorkoutLogs(userId, selectedDate);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-10 text-white">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-white/45">History</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white">
            {selectedDate ? `Workout Log — ${selectedDate}` : "Workout Log"}
          </h1>
          <p className="mt-3 text-sm text-white/55">
            {selectedDate
              ? "Showing records saved for the selected calendar day."
              : "Review all saved training sessions in chronological order."}
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/"
            className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Back to Dashboard
          </Link>

          {selectedDate ? (
            <Link
              href="/log"
              className="rounded-2xl border border-red-500/40 bg-red-500/15 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-500/20"
            >
              View All Logs
            </Link>
          ) : null}
        </div>
      </div>

      <WorkoutLogList logs={logs} />

      {selectedDate && logs.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-dashed border-white/10 bg-white/[0.03] px-6 py-8 text-sm text-white/60">
          No workout records found for {selectedDate}.
        </div>
      ) : null}
    </main>
  );
}