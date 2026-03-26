type Log = {
  id: number;
  weight: number;
  reps: number;
  sets: number;
  performedAt: Date;
  exercise: {
    name: string;
  };
};

type Props = {
  logs: Log[];
};

export default function WorkoutLogList({ logs }: Props) {
  return (
    <section className="section-card">
      <div className="mb-5 space-y-1">
        <h2 className="section-title">Saved Sessions</h2>
        <p className="section-subtitle">
          Review your training sessions in chronological order.
        </p>
      </div>

      {logs.length === 0 ? (
        <p className="text-gray-400">No logs yet.</p>
      ) : (
        <div className="space-y-3">
          {logs.map((log) => (
            <div key={log.id} className="soft-panel">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-lg font-semibold text-white">
                  {log.exercise.name}
                </p>
                <p className="text-sm text-gray-400">
                  {new Date(log.performedAt).toLocaleDateString()}
                </p>
              </div>

              <p className="mt-2 text-gray-300">
                <span className="font-semibold text-white">{log.weight} kg</span> ×{" "}
                {log.reps} reps × {log.sets} sets
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}