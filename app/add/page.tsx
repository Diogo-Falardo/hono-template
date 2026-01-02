"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

export default function Page() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(""); // YYYY-MM-DD from <input type="date" />
  const [exerciseName, setExerciseName] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    // basic validation
    if (!title || !date || !exerciseName || !weight || !reps) {
      setMessage("Fill all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          workout_date: date,
          exercise_name: exerciseName,
          weight: Number(weight),
          reps: Number(reps),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data?.error ?? "Something went wrong");
        return;
      }

      setMessage("Saved ✅");

      // clear form
      setTitle("");
      setDate("");
      setExerciseName("");
      setWeight("");
      setReps("");
    } catch {
      setMessage("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-5">
      <h1 className="text-2xl font-semibold">Add Workout</h1>

      <Input
        placeholder="Workout title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <div className="grid grid-cols-1 gap-4">
        <Input
          placeholder="Exercise name"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <Input
            placeholder="Reps"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-green-500 hover:bg-green-600 text-white font-medium"
      >
        {loading ? "Saving..." : "Add Workout"}
      </Button>

      {message && (
        <p className="text-sm text-center text-neutral-600">{message}</p>
      )}
    </form>
  );
}
