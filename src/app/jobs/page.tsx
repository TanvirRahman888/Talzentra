
type JobsPageProps = {
  searchParams: Promise<{
    q?: string;
    location?: string;
  }>;
};

export default async function JobsPage({
  searchParams,
}: JobsPageProps) {
  const { q, location } = await searchParams;

  return (
    <main className="mx-auto max-w-7xl px-4 py-16">
      <h1 className="text-3xl font-bold text-foreground">
        Explore Jobs
      </h1>

      <p className="mt-3 text-muted-foreground">
        Job listings will be implemented in the next step.
      </p>

      <div className="mt-6 rounded-xl border border-border bg-card p-6">
        <h2 className="mb-3 font-semibold">
          Your Search
        </h2>

        <p>Keyword: {q || "All jobs"}</p>
        <p>Location: {location || "All locations"}</p>
      </div>
    </main>
  );
}
