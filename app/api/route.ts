import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

function jsonSafe<T>(data: T): T {
  return JSON.parse(
    JSON.stringify(data, (_, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
}

// GET /add/api  -> list last 50 workouts
export async function GET() {
  try {
    const workout = await prisma.workouts.findMany({
      orderBy: { id: "desc" },
      take: 50,
    });
    return NextResponse.json(jsonSafe(workout));
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const title = String(body.title ?? "").trim();
    const workout_date = String(body.workout_date ?? "").trim(); // "YYYY-MM-DD"
    const exercise_name = String(body.exercise_name ?? "").trim();
    const weight = Number(body.weight);
    const reps = Number(body.reps);

    if (
      !title ||
      !workout_date ||
      !exercise_name ||
      !Number.isFinite(weight) ||
      !Number.isFinite(reps)
    ) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const created = await prisma.workouts.create({
      data: {
        title,
        workout_date: new Date(workout_date),
        exercise_name,
        weight,
        reps,
      },
    });

    return NextResponse.json(jsonSafe(created), { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}
