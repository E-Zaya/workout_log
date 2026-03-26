"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type CreateWorkoutLogInput = {
  userId: number;
  exerciseId: number;
  weight: number;
  reps: number;
  sets: number;
  performedAt?: Date;
};

export async function createWorkoutLog(input: CreateWorkoutLogInput) {
  const { userId, exerciseId, weight, reps, sets, performedAt } = input;

  if (!userId || !exerciseId || !weight || !reps || !sets) {
    throw new Error("Missing required fields.");
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