"use client";

import { useState, useTransition } from "react";
import { createWorkoutLog } from "@/actions/workout";

type Exercise = {
  id: number;
  name: string;
};

type Props = {
  exercises: Exercise[];
  userId: number;
};

export default function AddTrainingForm({ exercises, userId }: Props) {
  const [exerciseId, setExerciseId] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!exerciseId) return;

    startTransition(async () => {
      await createWorkoutLog({
        userId,
        exerciseId: Number(exerciseId),
        weight: Number(weight),
        reps: Number(reps),
        sets: Number(sets),
      });

      setExerciseId("");
      setWeight("");
      setReps("");
      setSets("");
    });
  };

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight text-white">
          Add today&apos;s training
        </h2>
        <p className="text-sm text-gray-300">
          Save one workout log with exercise, weight, reps, and sets.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <select
          value={exerciseId}
          onChange={(e) => setExerciseId(e.target.value)}
          className="input-base"
          required
        >
          <option value="" className="text-black">
            Select exercise
          </option>
          {exercises.map((exercise) => (
            <option key={exercise.id} value={exercise.id} className="text-black">
              {exercise.name}
            </option>
          ))}
        </select>

        <div className="grid gap-4 sm:grid-cols-3">
          <input
            type="number"
            min="0"
            step="0.5"
            placeholder="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="input-base"
            required
          />

          <input
            type="number"
            min="1"
            placeholder="Reps"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            className="input-base"
            required
          />

          <input
            type="number"
            min="1"
            placeholder="Sets"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
            className="input-base"
            required
          />
        </div>

        <div className="pt-1">
          <button type="submit" dised={isPending} className="primary-btn w-full sm:w-auto">
            {isPending ? "Saving..." : "Add today's training"}
          </button>
        </div>
      </form>
    </div>
  );
}