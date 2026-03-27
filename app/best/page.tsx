import Link from "next/link";
import BestRecordList from "@/components/best/BestRecordList";
import { getBestRecords } from "@/lib/queries/workout";
export const dynamic = "force-dynamic";

export default async function BestPage() {
  const userId = 1;
  const bestRecords = await getBestRecords(userId);

  return (
    <main className="min-h-screen text-white">
      <div className="app-shell space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="hero-kicker">Performance</p>
            <h1 className="text-3xl font-bold tracking-tight">My Best</h1>
          </div>

          <Link href="/" className="secondary-btn">
            Back to Dashboard
          </Link>
        </div>

        <BestRecordList items={bestRecords} />
      </div>
    </main>
  );
}