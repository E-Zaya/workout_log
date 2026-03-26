"use client";

import { useState, useTransition } from "react";
import { createExercise, deleteExercise } from "@/actions/exercise";

type Exercise = {
  id: number;
  name: string;
};

type Props = {
  exercises: Exercise[];
};

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
        setError(err instanceof Error ? err.message : "Failed to add exercise");
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
        setError(err instanceof Error ? err.message : "Failed to delete exercise");
      }
    });
  };

  return (
    <div className="space-y-5 rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight text-white">
          Manage exercises
        </h2>
        <p className="text-sm text-gray-300">
          Add your own training exercise or remove unused ones.
        </p>
      </div>

      <form onSubmit={handleAddExercise} className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          placeholder="e.g. Bench Press"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-base flex-1"
          required
        />
        <button
          type="submit"
          disabled={isPending}
          className="primary-btn whitespace-nowrap"
        >
          {isPending ? "Adding..." : "Add exercise"}
        </button>
      </form>

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}

      <div className="space-y-2">
        {exercises.length === 0 ? (
          <p className="text-sm text-gray-400">No exercises yet.</p>
        ) : (
          exercises.map((exercise) => (
            <div
              key={exercise.id}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3"
            >
              <span className="text-white">{exercise.name}</span>

              <button
                type="button"
                onClick={() => handleDeleteExercise(exercise.id)}
                disabled={isPending}
                className="rounded-lg border border-red-400/40 px-3 py-1.5 text-sm text-red-300 transition hover:bg-red-500/10 disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}