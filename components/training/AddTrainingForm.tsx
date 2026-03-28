"use client";

import { useState, useTransition } from "react";
import { createWorkoutLog } from "@/actions/workout";
import type { ExerciseOption } from "@/types/workout";

type Props = {
  exercises: ExerciseOption[];
  userId: number;
  onSuccess?: () => void;
};

export default function AddTrainingForm({
  exercises,
  userId,
  onSuccess,
}: Props) {
  const [exerciseId, setExerciseId] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const resetForm = () => {
    setExerciseId("");
    setWeight("");
    setReps("");
    setSets("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    startTransition(async () => {
      try {
        await createWorkoutLog({
          userId,
          exerciseId: Number(exerciseId),
          weight: Number(weight),
          reps: Number(reps),
          sets: Number(sets),
        });

        resetForm();
        onSuccess?.();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to save workout.");
      }
    });
  };

  return (
    <form className="form-stack" onSubmit={handleSubmit}>
      <p className="section-subtitle">
        Save one workout log with exercise, weight, reps, and sets.
      </p>

      <label className="form-field">
        <span className="form-label">Exercise</span>
        <select
          value={exerciseId}
          onChange={(e) => setExerciseId(e.target.value)}
          className="input-base"
          required
        >
          <option value="" style={{ backgroundColor: "#111", color: "#fff" }}>Select exercise</option>
          {exercises.map((exercise) => (
            <option
              key={exercise.id}
              value={exercise.id}
              style={{ backgroundColor: "#111111", color: "#ffffff" }}
            >
              {exercise.name}
            </option>
          ))}
        </select>
      </label>

      <div className="form-grid">
        <label className="form-field">
          <span className="form-label">Weight (kg)</span>
          <input
            type="number"
            min="0.5"
            step="0.5"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="input-base"
            required
          />
        </label>

        <label className="form-field">
          <span className="form-label">Reps</span>
          <input
            type="number"
            min="1"
            step="1"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            className="input-base"
            required
          />
        </label>

        <label className="form-field">
          <span className="form-label">Sets</span>
          <input
            type="number"
            min="1"
            step="1"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
            className="input-base"
            required
          />
        </label>
      </div>

      {error ? <p className="error-text">{error}</p> : null}

      <button type="submit" className="primary-btn w-full" disabled={isPending}>
        {isPending ? "Saving..." : "Save Workout"}
      </button>
    </form>
  );
}