type Props = {
  monthlyActiveDays: number;
  totalActiveDays: number;
  thisWeekTotal: number;
};

export default function SummaryCards({
  monthlyActiveDays,
  totalActiveDays,
  thisWeekTotal,
}: Props) {
  const cards = [
    { label: "Monthly Active Days", value: monthlyActiveDays },
    { label: "Total Active Days", value: totalActiveDays },
    { label: "This Week Total Weight", value: `${thisWeekTotal} kg` },
  ];

  return (
    <section className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <div key={card.label} className="section-card">
          <p className="stat-label">{card.label}</p>
          <h2 className="stat-value">{card.value}</h2>
        </div>
      ))}
    </section>
  );
}