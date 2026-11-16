
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { companies } from "@/data/companies";
import { jobs } from "@/data/jobs";

import CompanyCard from "@/components/shared/CompanyCard";
import { Button } from "@/components/ui/button";

export default function TopCompanies() {
  const hiringCompanies = companies.filter((company) =>
    jobs.some((job) => job.company === company.name)
  );

  return (
    <section className="bg-background px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-bold">
              Top Companies{" "}
              <span className="text-indigo-600 dark:text-indigo-400">
                Hiring
              </span>
            </h2>

            <p className="mt-3 text-muted-foreground">
              Discover companies and career opportunities.
            </p>
          </div>

          <Button asChild variant="outline">
            <Link href="/companies">
              Explore All Companies
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hiringCompanies.map((company) => {
            const openJobs = jobs.filter(
              (job) => job.company === company.name
            ).length;

            return (
              <CompanyCard
                key={company.id}
                company={company}
                openJobs={openJobs}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}
