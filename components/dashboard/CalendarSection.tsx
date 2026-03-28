import Link from "next/link";

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
  const startWeekday = firstDayOfMonth.getDay(); // 0 = Sun

  const activeDateSet = new Set(activeDates.map((date) => date.slice(0, 10)));

  const calendarCells: Array<{ date: Date | null; isCurrentMonth: boolean }> = [];

  for (let i = 0; i < startWeekday; i++) {
    calendarCells.push({
      date: null,
      isCurrentMonth: false,
    });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarCells.push({
      date: new Date(currentYear, currentMonth, day),
      isCurrentMonth: true,
    });
  }

  while (calendarCells.length < 42) {
    calendarCells.push({
      date: null,
      isCurrentMonth: false,
    });
  }

  const weekLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthLabel = today.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <section className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-white/45">Training Calendar</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">{monthLabel}</h2>
          <p className="mt-2 text-sm text-white/55">
            Click an active day to view that day&apos;s workout log.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-right">
          <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">This Month</p>
            <p className="mt-2 text-xl font-bold text-white">{monthlyActiveDays}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">All Time</p>
            <p className="mt-2 text-xl font-bold text-white">{totalActiveDays}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {weekLabels.map((label) => (
          <div
            key={label}
            className="flex h-10 items-center justify-center text-xs font-medium uppercase tracking-[0.18em] text-white/35"
          >
            {label}
          </div>
        ))}

        {calendarCells.map((cell, index) => {
          if (!cell.date) {
            return (
              <div
                key={`empty-${index}`}
                className="h-14 rounded-2xl border border-transparent bg-transparent"
              />
            );
          }

          const dateKey = formatDateKey(cell.date);
          const isActive = activeDateSet.has(dateKey);
          const isToday = dateKey === formatDateKey(today);

          const baseClassName =
            "relative flex h-14 items-center justify-center rounded-2xl border text-sm font-semibold transition";
          const activeClassName = isActive
            ? "border-red-500/40 bg-red-500/15 text-white hover:-translate-y-0.5 hover:border-red-400 hover:bg-red-500/20"
            : "border-white/10 bg-white/[0.03] text-white/70";

          const content = (
            <>
              <span>{cell.date.getDate()}</span>

              {isActive && <span className="absolute bottom-2 h-1.5 w-1.5 rounded-full bg-red-400" />}

              {isToday && !isActive && (
                <span className="absolute bottom-2 h-1.5 w-1.5 rounded-full bg-white/70" />
              )}
            </>
          );

          if (isActive) {
            return (
              <Link
                key={dateKey}
                href={`/log?date=${dateKey}`}
                aria-label={`View workout log for ${dateKey}`}
                className={`${baseClassName} ${activeClassName}`}
              >
                {content}
              </Link>
            );
          }

          return (
            <div
              key={dateKey}
              aria-disabled="true"
              className={`${baseClassName} ${activeClassName}`}
            >
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
}