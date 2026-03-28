import { prisma } from "@/lib/prisma";

function getStartOfWeek(date: Date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day; // Monday start

  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);

  return d;
}

function getEndOfWeek(start: Date) {
  const end = new Date(start);
  end.setDate(end.getDate() + 7);
  return end;
}

function toDateKey(date: Date) {
  return date.toISOString().split("T")[0];
}

function getDateRangeFromKey(dateKey: string) {
  const start = new Date(`${dateKey}T00:00:00`);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);

  return { start, end };
}

export async function getWorkoutLogs(userId: number, dateKey?: string) {
  const performedAtFilter = dateKey
    ? (() => {
        const { start, end } = getDateRangeFromKey(dateKey);
        return {
          gte: start,
          lt: end,
        };
      })()
    : undefined;

  return prisma.workoutLog.findMany({
    where: {
      userId,
      ...(performedAtFilter ? { performedAt: performedAtFilter } : {}),
    },
    include: {
      exercise: true,
    },
    orderBy: {
      performedAt: "desc",
    },
  });
}

export async function getBestRecords(userId: number) {
  const logs = await prisma.workoutLog.findMany({
    where: { userId },
    include: {
      exercise: true,
    },
    orderBy: {
      weight: "desc",
    },
  });

  const bestMap = new Map();

  for (const log of logs) {
    const name = log.exercise.name;

    if (!bestMap.has(name)) {
      bestMap.set(name, {
        exerciseName: name,
        weight: log.weight,
      });
    }
  }

  return Array.from(bestMap.values());
}

export async function getWeeklyVolumes(userId: number) {
  const now = new Date();
  const currentWeekStart = getStartOfWeek(now);
  const result: {
    label: string;
    total: number;
    startDate: string;
    endDate: string;
  }[] = [];

  for (let i = 0; i <= 5; i++) {
    const start = new Date(currentWeekStart);
    start.setDate(currentWeekStart.getDate() - i * 7);

    const end = getEndOfWeek(start);

    const logs = await prisma.workoutLog.findMany({
      where: {
        userId,
        performedAt: {
          gte: start,
          lt: end,
        },
      },
    });

    const total = logs.reduce((sum, log) => {
      return sum + log.weight * log.reps * log.sets;
    }, 0);

    result.push({
      label: i === 0 ? "This week" : `${i} week ago`,
      total,
      startDate: start.toISOString(),
      endDate: end.toISOString(),
    });
  }

  return result;
}

export async function getCalendarStats(userId: number) {
  const logs = await prisma.workoutLog.findMany({
    where: { userId },
    select: {
      performedAt: true,
    },
    orderBy: {
      performedAt: "desc",
    },
  });

  const totalActiveDaysSet = new Set(logs.map((log) => toDateKey(log.performedAt)));

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const monthlyLogs = logs.filter((log) => {
    const d = new Date(log.performedAt);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const monthlyActiveDaysSet = new Set(monthlyLogs.map((log) => toDateKey(log.performedAt)));

  return {
    monthlyActiveDays: monthlyActiveDaysSet.size,
    totalActiveDays: totalActiveDaysSet.size,
    activeDates: Array.from(monthlyActiveDaysSet).sort(),
  };
}