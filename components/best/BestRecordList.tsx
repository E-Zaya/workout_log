type Item = {
  exerciseName: string;
  weight: number;
};

type Props = {
  items: Item[];
};

export default function BestRecordList({ items }: Props) {
  return (
    <section className="section-card">
      <div className="mb-5 space-y-1">
        <h2 className="section-title">Best Records</h2>
        <p className="section-subtitle">
          Your highest recorded weight for each exercise.
        </p>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-400">No records yet.</p>
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={item.exerciseName}
              className="soft-panel flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/15 text-sm font-semibold text-red-300">
                  {index + 1}
                </span>
                <span className="text-white">{item.exerciseName}</span>
              </div>

              <span className="shrink-0 text-lg font-bold text-red-300">
                {item.weight} kg
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}