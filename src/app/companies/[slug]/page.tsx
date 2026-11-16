
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Globe,
  Mail,
  MapPin,
  Phone,
  Users,
} from "lucide-react";

import { companies } from "@/data/companies";
import { jobs } from "@/data/jobs";

import JobCard from "@/components/jobs/JobCard";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type CompanyDetailsProps = {
  params: Promise<{ slug: string }>;
};

// Generate sample company pages at build time.
export function generateStaticParams() {
  return companies.map((company) => ({
    slug: company.slug,
  }));
}

// Dynamic SEO metadata.
export async function generateMetadata({
  params,
}: CompanyDetailsProps): Promise<Metadata> {
  const { slug } = await params;

  const company = companies.find(
    (item) => item.slug === slug
  );

  if (!company) {
    return {
      title: "Company Not Found | Talzentra",
    };
  }

  return {
    title: `${company.name} | Talzentra`,
    description: company.description,
  };
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

  // Get sample jobs belonging to this company.
  const companyJobs = jobs
    .filter((job) => job.company === company.name)
    .sort((a, b) =>
      b.postedAt.localeCompare(a.postedAt)
    );

  // Create fallback initials for company branding.
  const initials = company.name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  // Only display HTTPS website links.
  const websiteUrl = company.website?.startsWith(
    "https://"
  )
    ? company.website
    : undefined;

  const hasContact =
    websiteUrl ||
    company.contactEmail ||
    company.contactPhone;

  const companyFacts = [
    {
      label: "Industry",
      value: company.industry,
      icon: Building2,
    },
    {
      label: "Location",
      value: company.location,
      icon: MapPin,
    },
    {
      label: "Company Size",
      value: company.size,
      icon: Users,
    },
    {
      label: "Founded",
      value: company.foundedYear
        ? String(company.foundedYear)
        : "Not specified",
      icon: CalendarDays,
    },
    {
      label: "Sample Jobs",
      value: String(companyJobs.length),
      icon: BriefcaseBusiness,
    },
  ];

  return (
    <main className="min-h-screen bg-background pb-16">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Back Button */}
        <Button
          asChild
          variant="ghost"
          className="mb-6"
        >
          <Link href="/companies">
            <ArrowLeft className="mr-2 size-4" />
            Back to Companies
          </Link>
        </Button>

        {/* Company Profile Header */}
        <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">

          {/* Cover Background */}
          <div className="h-28 bg-linear-to-r from-indigo-500/20 via-violet-500/15 to-transparent sm:h-36" />

          <div className="px-5 pb-7 sm:px-8">

            <div className="-mt-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

              <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-end">

                {/* Company Logo */}
                <Avatar className="size-20 shrink-0 rounded-2xl border-4 border-background bg-card sm:size-24">
                  {company.logoUrl && (
                    <AvatarImage
                      src={company.logoUrl}
                      alt={`${company.name} logo`}
                    />
                  )}

                  <AvatarFallback className="rounded-xl bg-indigo-500/10 text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                {/* Company Identity */}
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                    {company.name}
                  </h1>

                  <Badge variant="secondary">
                    {company.industry}
                  </Badge>

                  <p className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="size-4 shrink-0" />
                    {company.location}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <Button
                asChild
                className="w-full bg-indigo-600 text-white hover:bg-indigo-700 sm:w-auto"
              >
                <a href="#open-positions">
                  Explore Jobs
                  <ArrowUpRight className="ml-2 size-4" />
                </a>
              </Button>
            </div>

            {company.tagline && (
              <p className="mt-6 max-w-2xl text-base text-muted-foreground">
                {company.tagline}
              </p>
            )}
          </div>
        </section>

        {/* Main Content */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">

          {/* Left Column */}
          <div className="min-w-0 space-y-8">

            {/* About Company */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  About {company.name}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="leading-8 text-muted-foreground">
                  {company.description}
                </p>
              </CardContent>
            </Card>

            {/* Available Jobs */}
            <section
              id="open-positions"
              aria-labelledby="company-jobs-heading"
              className="scroll-mt-24 space-y-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2
                    id="company-jobs-heading"
                    className="text-2xl font-bold tracking-tight"
                  >
                    Jobs at {company.name}
                  </h2>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {companyJobs.length} sample{" "}
                    {companyJobs.length === 1
                      ? "listing"
                      : "listings"}{" "}
                    available to explore.
                  </p>
                </div>

                <Button variant="outline" asChild>
                  <Link
                    href={`/jobs?q=${encodeURIComponent(
                      company.name
                    )}`}
                  >
                    Browse Jobs
                    <ArrowUpRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </div>

              {companyJobs.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                  {companyJobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                    />
                  ))}
                </div>
              ) : (
                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center py-10 text-center">
                    <BriefcaseBusiness className="mb-4 size-10 text-muted-foreground" />

                    <h3 className="text-lg font-semibold">
                      No Jobs Available
                    </h3>

                    <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                      There are no sample listings for this
                      company at the moment.
                    </p>

                    <Button
                      asChild
                      variant="outline"
                      className="mt-5"
                    >
                      <Link href="/jobs">
                        Explore Other Jobs
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </section>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24">

            {/* Company Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  Company Overview
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-5">
                {companyFacts.map((fact) => {
                  const Icon = fact.icon;

                  return (
                    <div
                      key={fact.label}
                      className="flex items-start gap-3"
                    >
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                        <Icon className="size-5" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">
                          {fact.label}
                        </p>

                        <p className="mt-1 text-sm font-medium wrap-break-word">
                          {fact.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  Contact Information
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {websiteUrl && (
                  <div className="space-y-2">
                    <p className="flex items-center gap-2 text-sm font-medium">
                      <Globe className="size-4 text-indigo-600 dark:text-indigo-400" />
                      Website
                    </p>

                    <a
                      href={websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block break-all text-sm text-indigo-600 hover:underline dark:text-indigo-400"
                    >
                      {websiteUrl}
                      <ArrowUpRight className="ml-1 inline size-3.5" />
                    </a>
                  </div>
                )}

                {company.contactEmail && (
                  <>
                    {websiteUrl && <Separator />}

                    <div className="space-y-2">
                      <p className="flex items-center gap-2 text-sm font-medium">
                        <Mail className="size-4 text-indigo-600 dark:text-indigo-400" />
                        Email
                      </p>

                      <a
                        href={`mailto:${company.contactEmail}`}
                        className="block break-all text-sm text-indigo-600 hover:underline dark:text-indigo-400"
                      >
                        {company.contactEmail}
                      </a>
                    </div>
                  </>
                )}

                {company.contactPhone && (
                  <>
                    {(websiteUrl || company.contactEmail) && (
                      <Separator />
                    )}

                    <div className="space-y-2">
                      <p className="flex items-center gap-2 text-sm font-medium">
                        <Phone className="size-4 text-indigo-600 dark:text-indigo-400" />
                        Phone
                      </p>

                      <a
                        href={`tel:${company.contactPhone.replace(
                          /[^\d+]/g,
                          ""
                        )}`}
                        className="text-sm text-indigo-600 hover:underline dark:text-indigo-400"
                      >
                        {company.contactPhone}
                      </a>
                    </div>
                  </>
                )}

                {!hasContact && (
                  <p className="text-sm leading-6 text-muted-foreground">
                    Public contact information has not
                    been provided for this company.
                  </p>
                )}
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  );
}
