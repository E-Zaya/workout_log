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

  const calendarCells: Array<{
    date: Date | null;
    isCurrentMonth: boolean;
  }> = [];

  // 月初前の空セル
  for (let i = 0; i < startWeekday; i++) {
    calendarCells.push({
      date: null,
      isCurrentMonth: false,
    });
  }

  // 当月の日付
  for (let day = 1; day <= daysInMonth; day++) {
    calendarCells.push({
      date: new Date(currentYear, currentMonth, day),
      isCurrentMonth: true,
    });
  }

  // 6週ぶんで見た目を安定させる
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

  // ... (前段のロジックは同じ)

return (
  <section className="section-card">
    {/* ヘッダー部分はそのまま */}
    
    <div className="overflow-hidden rounded-[24px] border border-white/10 bg-black/20">
      {/* 曜日ラベル */}
      <div className="grid grid-cols-7 border-b border-white/10 bg-white/5">
        {weekLabels.map((label) => (
          <div key={label} className="py-3 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
  {calendarCells.map((cell, index) => {
    if (!cell.date) {
      return (
        <div
          key={`empty-${index}`}
          className="aspect-square border-b border-r border-white/5"
        />
      );
    }

    const dateKey = formatDateKey(cell.date);
    const isActive = activeDateSet.has(dateKey);
    const isToday = dateKey === formatDateKey(today);

    return (
      <Link
        key={dateKey}
        href={`/log?date=${dateKey}`}
        className={[
          "relative block aspect-square cursor-pointer border-b border-r border-white/5 p-1 transition-colors hover:bg-white/5",
          isActive ? "bg-red-500/[0.03]" : "",
        ].join(" ")}
      >
        <div className="flex h-full flex-col items-center justify-center gap-1">
          <span
            className={[
              "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all",
              isToday ? "ring-1 ring-white/50 text-white" : "text-gray-400",
              isActive ? "font-bold text-red-400" : "",
            ].join(" ")}
          >
            {cell.date.getDate()}
          </span>

          <div className="h-1.5 w-1.5">
            {isActive && (
              <div className="h-full w-full animate-pulse rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
            )}
          </div>
        </div>

        {isToday && !isActive && (
          <div className="absolute right-1 top-1 h-1 w-1 rounded-full bg-white/30" />
        )}
      </Link>
    );
  })}
</div>
    </div>
  </section>
);
}