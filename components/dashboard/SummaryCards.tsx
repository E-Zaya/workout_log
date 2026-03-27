import type { SummaryMetric } from "@/types/workout";

type Props = {
  items: SummaryMetric[];
};

export default function SummaryCards({ items }: Props) {
  return (
    <section className="panel-card">
      <div className="section-header">
        <div>
          <p className="eyebrow">Overview</p>
          <h2 className="section-title">Key Metrics</h2>
        </div>
      </div>

      <div className="metric-grid">
        {items.map((item) => (
          <article key={item.label} className="metric-card">
            <p className="metric-label">{item.label}</p>
            <p className="metric-value">{item.value}</p>
            {item.helper ? <p className="metric-helper">{item.helper}</p> : null}
          </article>
        ))}
      </div>
    </section>
  );
}