"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function createExercise(formData: FormData) {
  const name = formData.get("name")?.toString().trim();

  if (!name) {
    throw new Error("Exercise name is required");
  }

  await prisma.exercise.create({
    data: {
      name,
    },
  });

  revalidatePath("/");
}

export async function deleteExercise(formData: FormData) {
  const id = Number(formData.get("id"));

  if (!id) {
    throw new Error("Exercise id is invalid");
  }

  const linkedLog = await prisma.workoutLog.findFirst({
    where: {
      exerciseId: id,
    },
  });

  if (linkedLog) {
    throw new Error("This exercise is already used in workout logs");
  }

  await prisma.exercise.delete({
    where: {
      id,
    },
  });

  revalidatePath("/");
}