type CalendarSectionProps = {
  activeDates: string[];
  monthlyActiveDays: number;
  totalActiveDays: number;
};

function formatDateKey(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function CalendarSection({
  activeDates,
  monthlyActiveDays,
  totalActiveDays,
}: CalendarSectionProps) {
  const today = new Date();

  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

  const daysInMonth = lastDayOfMonth.getDate();
  const startWeekday = firstDayOfMonth.getDay();

  const activeDateSet = new Set(activeDates.map((date) => date.slice(0, 10)));

  const calendarCells: Array<{ date: Date | null }> = [];

  for (let i = 0; i < startWeekday; i += 1) {
    calendarCells.push({ date: null });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    calendarCells.push({ date: new Date(currentYear, currentMonth, day) });
  }

  while (calendarCells.length < 42) {
    calendarCells.push({ date: null });
  }

  const weekLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthLabel = today.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <section className="panel-card">
      <div className="section-header">
        <div>
          <p className="eyebrow">Attendance</p>
          <h2 className="section-title">{monthLabel}</h2>
        </div>

        <div className="calendar-stat-group">
          <div className="calendar-stat-pill">
            <span>{monthlyActiveDays}</span>
            <small>This month</small>
          </div>
          <div className="calendar-stat-pill">
            <span>{totalActiveDays}</span>
            <small>Total</small>
          </div>
        </div>
      </div>

      <div className="calendar-weekdays">
        {weekLabels.map((label) => (
          <div key={label} className="calendar-weekday">
            {label}
          </div>
        ))}
      </div>

      <div className="calendar-grid">
        {calendarCells.map((cell, index) => {
          if (!cell.date) {
            return <div key={`empty-${index}`} className="calendar-cell is-empty" />;
          }

          const dateKey = formatDateKey(cell.date);
          const isActive = activeDateSet.has(dateKey);
          const isToday = dateKey === formatDateKey(today);

          return (
            <div
              key={dateKey}
              className={[
                "calendar-cell",
                isToday ? "is-today" : "",
                isActive ? "is-active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span className="calendar-day-number">{cell.date.getDate()}</span>
              {isActive ? <span className="calendar-dot" /> : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}