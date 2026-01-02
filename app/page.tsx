export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-neutral-900 to-neutral-800 text-white">
      <div className="max-w-xl text-center space-y-4 p-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Simple Gym Tracker
        </h1>

        <p className="text-neutral-300">
          Track your workouts, exercises, and progress with a minimal full-stack
          app built using Next.js, Prisma, and MySQL.
        </p>

        <p className="text-sm text-neutral-400">
          Built by <span className="font-medium text-white">Diogo Falardo</span>
        </p>
      </div>
    </main>
  );
}
