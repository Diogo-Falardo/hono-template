import React from "react";

type Workout = {
  id: string; // BigInt serialized as string
  title: string;
  workout_date: string;
  exercise_name: string;
  weight: number;
  reps: number;
  created_at: string;
};

export default async function Page() {
  const res = await fetch("http://localhost:3000/api", {
    cache: "no-store", // always fresh data
  });

  if (!res.ok) {
    return <div className="p-4">Failed to load workouts</div>;
  }

  const workouts: Workout[] = await res.json();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">Workouts</h1>

      {workouts.length === 0 && (
        <p className="text-sm text-neutral-500">No workouts yet</p>
      )}

      <ul className="space-y-4">
        {workouts.map((w) => (
          <li
            key={w.id}
            className="rounded-lg border bg-white/50 backdrop-blur p-4 shadow-sm hover:shadow transition"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="font-semibold text-lg">{w.title}</p>

                <p className="text-sm text-neutral-600">
                  {w.exercise_name} · {w.weight}kg × {w.reps}
                </p>

                <p className="text-xs text-neutral-400">{w.workout_date}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
