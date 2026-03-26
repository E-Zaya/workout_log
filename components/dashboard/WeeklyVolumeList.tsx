type Item = {
  label: string;
  total: number;
};

type Props = {
  items: Item[];
};

export default function WeeklyVolumeList({ items }: Props) {
  return (
    <section className="section-card">
      <div className="mb-5 space-y-1">
        <h2 className="section-title">Weekly Total Weight</h2>
        <p className="section-subtitle">
          Total lifted volume for this week and the previous 5 weeks.
        </p>
      </div>

      <div className="grid gap-3">
        {items.map((item, index) => (
          <div
            key={item.label}
            className="soft-panel flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/15 text-sm font-semibold text-red-300">
                {index + 1}
              </span>
              <span className="text-gray-200">{item.label}</span>
            </div>

            <span className="shrink-0 text-lg font-semibold text-white">
              {item.total.toLocaleString()} kg
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}