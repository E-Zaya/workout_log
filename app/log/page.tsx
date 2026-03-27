import Link from "next/link";
import WorkoutLogList from "@/components/log/WorkoutLogList";
import { getWorkoutLogs } from "@/lib/queries/workout";
export const dynamic = "force-dynamic";

export default async function LogPage() {
  const userId = 1;
  const logs = await getWorkoutLogs(userId);

  return (
    <main className="min-h-screen text-white">
      <div className="app-shell space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="hero-kicker">History</p>
            <h1 className="text-3xl font-bold tracking-tight">Workout Log</h1>
          </div>

          <Link href="/" className="secondary-btn">
            Back to Dashboard
          </Link>
        </div>

        <WorkoutLogList logs={logs} />
      </div>
    </main>
  );
}