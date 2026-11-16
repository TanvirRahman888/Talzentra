
import Link from "next/link";
import { ArrowRight, Sparkles, Clock3 } from "lucide-react";

import { jobs } from "@/data/jobs";
import JobCard from "@/components/jobs/JobCard";
import { Button } from "@/components/ui/button";

export default function FeaturedLatestJobs() {
  // Featured jobs
  const featuredJobs = jobs.filter(
    (job) => job.featured
  );

  // Latest non-featured jobs
  const latestJobs = jobs
    .filter((job) => !job.featured)
    .sort((a, b) =>
      b.postedAt.localeCompare(a.postedAt)
    )
    .slice(0, 6);

  return (
    <>
      {/* Featured Jobs Section */}
      <section className="bg-background px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                <Sparkles className="size-4" />
                Handpicked Opportunities
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Featured{" "}
                <span className="text-indigo-600 dark:text-indigo-400">
                  Jobs
                </span>
              </h2>

              <p className="mt-4 text-muted-foreground">
                Explore highlighted opportunities from
                employers on Talzentra.
              </p>
            </div>

            <Button variant="outline" asChild>
              <Link href="/jobs?featured=true">
                View Featured Jobs
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Jobs Section */}
      <section className="bg-muted/30 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                <Clock3 className="size-4" />
                Recently Added
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Latest{" "}
                <span className="text-indigo-600 dark:text-indigo-400">
                  Jobs
                </span>
              </h2>

              <p className="mt-4 text-muted-foreground">
                Discover recently posted opportunities
                and find your next career move.
              </p>
            </div>

            <Button variant="outline" asChild>
              <Link href="/jobs">
                View All Jobs
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {latestJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
