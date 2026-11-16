
type JobsPageProps = {
  searchParams: Promise<{
    q?: string;
    location?: string;
    category?: string;
  }>;
};

export default async function JobsPage({
  searchParams,
}: JobsPageProps) {
  const { q, location, category } = await searchParams;

  return (
    <main className="mx-auto max-w-7xl px-4 py-16">
      <h1 className="text-3xl font-bold text-foreground">
        Explore Jobs
      </h1>

      <p className="mt-3 text-muted-foreground">
        Browse job opportunities with Talzentra.
      </p>

      <div className="mt-8 rounded-xl border border-border bg-card p-6">
        <h2 className="mb-4 text-lg font-semibold">
          Your Search Filters
        </h2>

        <div className="space-y-2 text-sm">
          <p>Keyword: {q || "All jobs"}</p>
          <p>Location: {location || "All locations"}</p>
          <p>Category: {category || "All categories"}</p>
        </div>
      </div>
    </main>
  );
}
