"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { CreateWorkoutLogInput } from "@/types/workout";

export async function createWorkoutLog(input: CreateWorkoutLogInput) {
  const { userId, exerciseId, weight, reps, sets, performedAt } = input;

  if (
    !Number.isFinite(userId) ||
    !Number.isFinite(exerciseId) ||
    !Number.isFinite(weight) ||
    !Number.isFinite(reps) ||
    !Number.isFinite(sets)
  ) {
    throw new Error("Invalid input.");
  }

  if (weight <= 0 || reps <= 0 || sets <= 0) {
    throw new Error("Weight, reps, and sets must be greater than 0.");
  }

  await prisma.workoutLog.create({
    data: {
      userId,
      exerciseId,
      weight,
      reps,
      sets,
      performedAt: performedAt ?? new Date(),
    },
  });

  revalidatePath("/");
  revalidatePath("/log");
  revalidatePath("/best");
}