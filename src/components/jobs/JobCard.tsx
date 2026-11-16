
import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  MapPin,
  Wallet,
} from "lucide-react";

import type { Job } from "@/data/jobs";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type JobCardProps = {
  job: Job;
};

export default function JobCard({ job }: JobCardProps) {
  const companyInitials = job.company
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const postedDate = new Date(
    `${job.postedAt}T00:00:00Z`
  ).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

  return (
    <Card className="group flex h-full flex-col gap-4 border-border/70 bg-card py-5 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/5">

      {/* Company and Featured Badge */}
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between gap-3">

          {/* Company initials */}
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 text-sm font-bold text-indigo-600 dark:text-indigo-400">
            {companyInitials}
          </div>

          {job.featured && (
            <Badge className="border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
              Featured
            </Badge>
          )}
        </div>

        <div className="space-y-2">
          <CardTitle className="text-lg leading-snug">
            <Link
              href={`/jobs/${job.slug}`}
              className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              {job.title}
            </Link>
          </CardTitle>

          <CardDescription className="flex items-center gap-2">
            <BriefcaseBusiness className="size-4" />
            {job.company}
          </CardDescription>
        </div>
      </CardHeader>

      {/* Job Information */}
      <CardContent className="flex flex-1 flex-col gap-4">

        {/* Job type and work mode */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">
            {job.employmentType}
          </Badge>

          <Badge variant="outline">
            {job.workMode}
          </Badge>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="size-4 shrink-0" />
          <span>{job.location}</span>
        </div>

        {/* Salary */}
        <div className="flex items-start gap-2 text-sm font-medium text-foreground">
          <Wallet className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
          <span>
            {job.salary ?? "Salary not disclosed"}
          </span>
        </div>

        {/* Skills */}
        <div className="mt-auto flex flex-wrap gap-2">
          {job.skills.slice(0, 3).map((skill) => (
            <Badge
              key={skill}
              variant="outline"
              className="font-normal"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarDays className="size-3.5" />
          {postedDate}
        </span>

        <Button
          asChild
          variant="outline"
          size="sm"
          className="group-hover:border-indigo-500/40 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
        >
          <Link href={`/jobs/${job.slug}`}>
            View Job
            <ArrowUpRight className="ml-1 size-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
