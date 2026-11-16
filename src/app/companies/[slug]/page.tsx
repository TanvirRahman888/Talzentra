
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Users } from "lucide-react";

import { companies } from "@/data/companies";
import { jobs } from "@/data/jobs";


import { Button } from "@/components/ui/button";
import JobCard from "@/components/jobs/JobCard";

type CompanyDetailsProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return companies.map((company) => ({
    slug: company.slug,
  }));
}

export default async function CompanyDetailsPage({
  params,
}: CompanyDetailsProps) {
  const { slug } = await params;

  const company = companies.find(
    (item) => item.slug === slug
  );

  if (!company) {
    notFound();
  }

  const companyJobs = jobs.filter(
    (job) => job.company === company.name
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

      <Button asChild variant="ghost" className="mb-6">
        <Link href="/companies">
          <ArrowLeft className="mr-2 size-4" />
          Back to Companies
        </Link>
      </Button>

      {/* Company Profile */}
      <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <h1 className="text-3xl font-bold">
          {company.name}
        </h1>

        <p className="mt-2 text-indigo-600 dark:text-indigo-400">
          {company.industry}
        </p>

        <p className="mt-5 leading-7 text-muted-foreground">
          {company.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <MapPin className="size-4" />
            {company.location}
          </span>

          <span className="flex items-center gap-2">
            <Users className="size-4" />
            {company.size}
          </span>
        </div>
      </section>

      {/* Company Jobs */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold">
          Jobs at {company.name}
        </h2>

        <p className="mt-2 text-muted-foreground">
          {companyJobs.length} sample{" "}
          {companyJobs.length === 1 ? "opportunity" : "opportunities"}
        </p>

        {companyJobs.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {companyJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <p className="mt-6 rounded-xl border border-dashed p-6 text-muted-foreground">
            No sample jobs available for this company.
          </p>
        )}
      </section>
    </main>
  );
}
