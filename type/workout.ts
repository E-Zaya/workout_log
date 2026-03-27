export type ExerciseOption = {
  id: number;
  name: string;
};

export type SummaryMetric = {
  label: string;
  value: string | number;
  helper?: string;
};

export type WeeklyVolumeItem = {
  label: string;
  total: number;
  startDate: string;
  endDate: string;
};

export type CalendarStats = {
  monthlyActiveDays: number;
  totalActiveDays: number;
  activeDates: string[];
};

export type CreateWorkoutLogInput = {
  userId: number;
  exerciseId: number;
  weight: number;
  reps: number;
  sets: number;
  performedAt?: Date;
};

export type DashboardClientProps = {
  userId: number;
  exercises: ExerciseOption[];
  calendarStats: CalendarStats;
  weeklyVolumes: WeeklyVolumeItem[];
  thisWeekTotal: number;
};