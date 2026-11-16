
import type { Metadata } from "next";

import { companies } from "@/data/companies";
import { jobs } from "@/data/jobs";

import CompanyCard from "@/components/shared/CompanyCard";

export const metadata: Metadata = {
  title: "Explore Companies | Talzentra",
  description:
    "Explore companies and career opportunities on Talzentra.",
};

export default function CompaniesPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-10 max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Explore{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              Companies
            </span>
          </h1>

          <p className="mt-4 text-muted-foreground">
            Discover organizations and explore their
            career opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => {
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
    </main>
  );
}
