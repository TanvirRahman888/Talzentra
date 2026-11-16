
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Globe,
  MapPin,
  Users,
  Wallet,
} from "lucide-react";

import { jobs } from "@/data/jobs";

import JobCard from "@/components/jobs/JobCard";
import ApplyJobDialog from "@/components/jobs/ApplyJobDialog";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type JobDetailsProps = {
  params: Promise<{ slug: string }>;
};

// Format ISO dates for display.
function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

// Pre-render our six sample jobs.
export function generateStaticParams() {
  return jobs.map((job) => ({
    slug: job.slug,
  }));
}

// SEO metadata for each job.
export async function generateMetadata({
  params,
}: JobDetailsProps): Promise<Metadata> {
  const { slug } = await params;

  const job = jobs.find((item) => item.slug === slug);

  if (!job) {
    return { title: "Job Not Found | Talzentra" };
  }

  return {
    title: `${job.title} at ${job.company} | Talzentra`,
    description: job.description,
  };
}

// Reusable details list section.
function DetailList({
  title,
  items,
}: {
  title: string;
  items?: string[];
}) {
  if (!items?.length) return null;

  return (
    <Card className="gap-4">
      <CardHeader>
        <CardTitle className="text-xl">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3"
            >
              <CheckCircle2 className="mt-1 size-4 shrink-0 text-indigo-600 dark:text-indigo-400" />

              <span className="text-sm leading-7 text-muted-foreground">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default async function JobDetailsPage({
  params,
}: JobDetailsProps) {
  const { slug } = await params;

  const job = jobs.find((item) => item.slug === slug);

  if (!job) {
    notFound();
  }

  const companyInitials = job.company
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const isExpired = job.deadline
    ? new Date(`${job.deadline}T23:59:59Z`).getTime() <
      Date.now()
    : false;

  // Related jobs from the same category.
  const relatedJobs = jobs
    .filter(
      (item) =>
        item.slug !== job.slug &&
        item.category === job.category
    )
    .slice(0, 3);

  const overview = [
    {
      label: "Location",
      value: job.location,
      icon: MapPin,
    },
    {
      label: "Employment Type",
      value: job.employmentType,
      icon: BriefcaseBusiness,
    },
    {
      label: "Work Mode",
      value: job.workMode,
      icon: Globe,
    },
    {
      label: "Experience Level",
      value: job.experienceLevel ?? "Not specified",
      icon: Clock3,
    },
    {
      label: "Vacancies",
      value: job.vacancies
        ? `${job.vacancies} position(s)`
        : "Not specified",
      icon: Users,
    },
    {
      label: "Salary",
      value: job.salary ?? "Not disclosed",
      icon: Wallet,
    },
    {
      label: "Deadline",
      value: job.deadline
        ? formatDate(job.deadline)
        : "Not specified",
      icon: CalendarDays,
    },
  ];

  return (
    <main className="min-h-screen bg-background pb-24 lg:pb-0">

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Back Navigation */}
        <Button
          asChild
          variant="ghost"
          className="mb-6"
        >
          <Link href="/jobs">
            <ArrowLeft className="mr-2 size-4" />
            Back to Jobs
          </Link>
        </Button>

        {/* Job Header */}
        <div className="mb-8 rounded-2xl border border-border bg-card p-6 sm:p-8">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">

            {/* Company Initials */}
            <div className="flex size-16 shrink-0 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 text-xl font-bold text-indigo-600 dark:text-indigo-400">
              {companyInitials}
            </div>

            <div className="flex-1 space-y-4">

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                  {job.title}
                </h1>

                <p className="mt-2 text-base text-muted-foreground">
                  {job.company}
                </p>
              </div>

              {/* Job Badges */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">
                  {job.employmentType}
                </Badge>

                <Badge variant="outline">
                  {job.workMode}
                </Badge>

                {job.featured && (
                  <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300">
                    Featured
                  </Badge>
                )}

                {isExpired && (
                  <Badge variant="destructive">
                    Expired
                  </Badge>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">

                <span className="flex items-center gap-2">
                  <MapPin className="size-4" />
                  {job.location}
                </span>

                <span className="flex items-center gap-2">
                  <CalendarDays className="size-4" />
                  Posted {formatDate(job.postedAt)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content and Sidebar */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">

          {/* Left Column */}
          <div className="min-w-0 space-y-6">

            {/* Job Description */}
            <Card className="gap-4">
              <CardHeader>
                <CardTitle className="text-xl">
                  Job Description
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="leading-8 text-muted-foreground">
                  {job.description}
                </p>
              </CardContent>
            </Card>

            {/* Responsibilities */}
            <DetailList
              title="Key Responsibilities"
              items={job.responsibilities}
            />

            {/* Requirements */}
            <DetailList
              title="Requirements & Qualifications"
              items={job.requirements}
            />

            {/* Skills */}
            <Card className="gap-4">
              <CardHeader>
                <CardTitle className="text-xl">
                  Required Skills
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="px-3 py-1.5"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <DetailList
              title="Benefits & Perks"
              items={job.benefits}
            />

            {/* About Company */}
            <Card className="gap-4">
              <CardHeader>
                <CardTitle className="text-xl">
                  About {job.company}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-5">
                {job.companyInfo ? (
                  <>
                    <p className="leading-7 text-muted-foreground">
                      {job.companyInfo.about}
                    </p>

                    <Separator />

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Industry
                        </p>
                        <p className="mt-1 text-sm font-medium">
                          {job.companyInfo.industry}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">
                          Company Size
                        </p>
                        <p className="mt-1 text-sm font-medium">
                          {job.companyInfo.size}
                        </p>
                      </div>
                    </div>

                    {job.companyInfo.website && (
                      <a
                        href={job.companyInfo.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                      >
                        <Globe className="size-4" />
                        Visit Company Website
                      </a>
                    )}
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Additional company information
                    has not been provided for this
                    sample listing.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <aside className="lg:sticky lg:top-24">
            <Card className="gap-5">
              <CardHeader>
                <CardTitle className="text-xl">
                  Job Overview
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-5">

                {/* Overview Details */}
                {overview.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="flex items-start gap-3"
                    >
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                        <Icon className="size-4" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">
                          {item.label}
                        </p>

                        <p className="mt-1 text-sm font-medium wrap-break-word">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  );
                })}

                <Separator />

                <ApplyJobDialog
                  title={job.title}
                  company={job.company}
                  disabled={isExpired}
                  className="h-11 w-full"
                />

                <p className="text-center text-xs leading-5 text-muted-foreground">
                  Application submission will be enabled
                  after backend integration.
                </p>
              </CardContent>
            </Card>
          </aside>
        </div>

        {/* Related Jobs */}
        <section
          aria-labelledby="related-jobs-heading"
          className="mt-16 border-t border-border pt-12"
        >
          <div className="mb-8">
            <h2
              id="related-jobs-heading"
              className="text-2xl font-bold tracking-tight sm:text-3xl"
            >
              Related Jobs
            </h2>

            <p className="mt-2 text-muted-foreground">
              More opportunities in the same category.
            </p>
          </div>

          {relatedJobs.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {relatedJobs.map((relatedJob) => (
                <JobCard
                  key={relatedJob.id}
                  job={relatedJob}
                />
              ))}
            </div>
          ) : (
            <p className="rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground">
              No related sample jobs are available yet.
            </p>
          )}
        </section>
      </div>

      {/* Mobile Sticky Apply Button */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur-md lg:hidden">
        <ApplyJobDialog
          title={job.title}
          company={job.company}
          disabled={isExpired}
          className="h-11 w-full"
        />
      </div>
    </main>
  );
}
