"use client";

import { useMemo, useState } from "react";
import AddTrainingForm from "@/components/training/AddTrainingForm";
import ManageExercises from "@/components/training/ManageExercises";
import CalendarSection from "@/components/dashboard/CalendarSection";
import SummaryCards from "@/components/dashboard/SummaryCards";
import WeeklyVolumeChart from "@/components/dashboard/WeeklyVolumeChart";
import type { DashboardClientProps, SummaryMetric } from "@/types/workout";

export default function DashboardClient({
  userId,
  exercises,
  calendarStats,
  weeklyVolumes,
  thisWeekTotal,
}: DashboardClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const metrics = useMemo<SummaryMetric[]>(
    () => [
      {
        label: "Total Active Days",
        value: calendarStats.totalActiveDays,
        helper: "All recorded training days",
      },
      {
        label: "This Month",
        value: calendarStats.monthlyActiveDays,
        helper: "Active days this month",
      },
      {
        label: "This Week Total",
        value: `${thisWeekTotal.toLocaleString()} kg`,
        helper: "Weight × reps × sets",
      },
    ],
    [calendarStats.monthlyActiveDays, calendarStats.totalActiveDays, thisWeekTotal],
  );

  return (
    <main className="app-shell">
      <section className="dashboard-stack">
        <header className="panel-card dashboard-header">
          <div className="header-profile">
            <div className="profile-chip">Z</div>
            <div>
              <p className="eyebrow">Welcome back</p>
              <h1 className="header-greeting">Hello, Zaya!</h1>
            </div>
          </div>

          <div className="header-center">
            <p className="eyebrow">Dashboard</p>
            <p className="header-title">Workout Tracker</p>
          </div>

          <div className="header-actions">
            <button
              type="button"
              className="primary-btn header-cta"
              onClick={() => setIsModalOpen(true)}
            >
              + Record Workout
            </button>
          </div>
        </header>

        <section className="dashboard-grid-top">
          <WeeklyVolumeChart items={weeklyVolumes} />
          <SummaryCards items={metrics} />
        </section>

        <section className="dashboard-grid-bottom">
          <CalendarSection
            activeDates={calendarStats.activeDates}
            monthlyActiveDays={calendarStats.monthlyActiveDays}
            totalActiveDays={calendarStats.totalActiveDays}
          />
          <ManageExercises exercises={exercises} />
        </section>
      </section>

      {isModalOpen && (
        <div
          className="modal-overlay"
          onClick={() => setIsModalOpen(false)}
          aria-hidden="true"
        >
          <div
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="record-workout-title"
          >
            <div className="modal-header">
              <div>
                <p className="eyebrow">Quick entry</p>
                <h2 id="record-workout-title" className="modal-title">
                  Record Workout
                </h2>
              </div>

              <button
                type="button"
                className="icon-close-btn"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <AddTrainingForm
              exercises={exercises}
              userId={userId}
              onSuccess={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}
    </main>
  );
}