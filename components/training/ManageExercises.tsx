"use client";

import { useState, useTransition } from "react";
import { createExercise, deleteExercise } from "@/actions/exercise";
import type { ExerciseOption } from "@/types/workout";

type Props = {
  exercises: ExerciseOption[];
};

function TrashIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="trash-icon"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  );
}

export default function ManageExercises({ exercises }: Props) {
  const [name, setName] = useState("");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const handleAddExercise = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData();
    formData.append("name", name);

    startTransition(async () => {
      try {
        await createExercise(formData);
        setName("");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to add exercise.");
      }
    });
  };

  const handleDeleteExercise = (id: number) => {
    setError("");

    const formData = new FormData();
    formData.append("id", String(id));

    startTransition(async () => {
      try {
        await deleteExercise(formData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to delete exercise.",
        );
      }
    });
  };

  return (
    <section className="panel-card">
      <div className="section-header">
        <div>
          <p className="eyebrow">Exercise library</p>
          <h2 className="section-title">Manage Exercises</h2>
        </div>
      </div>

      <form className="exercise-create-row" onSubmit={handleAddExercise}>
        <input
          type="text"
          placeholder="Add exercise"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-base"
          required
        />
        <button type="submit" className="primary-btn" disabled={isPending}>
          {isPending ? "Adding..." : "Add"}
        </button>
      </form>

      {error ? <p className="error-text">{error}</p> : null}

      <div className="exercise-list">
        {exercises.length === 0 ? (
          <div className="empty-state">No exercises yet.</div>
        ) : (
          exercises.map((exercise) => (
            <div key={exercise.id} className="exercise-row">
              <span className="exercise-name">{exercise.name}</span>
              <button
                type="button"
                onClick={() => handleDeleteExercise(exercise.id)}
                disabled={isPending}
                className="danger-icon-btn"
                aria-label={`Delete ${exercise.name}`}
              >
                <TrashIcon />
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}