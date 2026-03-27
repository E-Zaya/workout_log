"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

function normalizeExerciseName(name: string) {
  const cleaned = name.trim().toLowerCase() === "squad" ? "squat" : name.trim();

  return cleaned
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

export async function createExercise(formData: FormData) {
  const rawName = formData.get("name")?.toString() ?? "";
  const name = normalizeExerciseName(rawName);

  if (!name) {
    throw new Error("Exercise name is required.");
  }

  const existing = await prisma.exercise.findFirst({
    where: {
      name: {
        equals: name,
        mode: "insensitive",
      },
    },
  });

  if (existing) {
    throw new Error("This exercise already exists.");
  }

  await prisma.exercise.create({
    data: { name },
  });

  revalidatePath("/");
}

export async function deleteExercise(formData: FormData) {
  const id = Number(formData.get("id"));

  if (!Number.isFinite(id)) {
    throw new Error("Exercise id is invalid.");
  }

  const linkedLog = await prisma.workoutLog.findFirst({
    where: {
      exerciseId: id,
    },
  });

  if (linkedLog) {
    throw new Error("This exercise is already used in workout logs.");
  }

  await prisma.exercise.delete({
    where: { id },
  });

  revalidatePath("/");
}