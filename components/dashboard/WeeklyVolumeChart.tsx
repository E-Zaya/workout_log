import type { WeeklyVolumeItem } from "@/types/workout";

type Props = {
  items: WeeklyVolumeItem[];
};

export default function WeeklyVolumeChart({ items }: Props) {
  const max = Math.max(...items.map((item) => item.total), 1);

  return (
    <section className="panel-card">
      <div className="section-header">
        <div>
          <p className="eyebrow">Volume trend</p>
          <h2 className="section-title">Last 5 Weeks</h2>
        </div>
        <p className="section-subtitle">Training volume by week</p>
      </div>

      <div className="chart-bars">
        {items.map((item) => {
          const height = `${Math.max((item.total / max) * 100, 10)}%`;

          return (
            <div key={item.label} className="chart-bar-column">
              <p className="chart-value">{item.total.toLocaleString()} kg</p>
              <div className="chart-track">
                <div className="chart-bar" style={{ height }} />
              </div>
              <p className="chart-label">{item.label}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}