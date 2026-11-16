
import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  MapPin,
  Users,
} from "lucide-react";

import type { Company } from "@/data/companies";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Define component props
type CompanyCardProps = {
  company: Company;
  openJobs: number;
};

export default function CompanyCard({
  company,
  openJobs,
}: CompanyCardProps) {
  const initials = company.name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Card className="group flex h-full flex-col gap-4 border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-lg">

      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <Avatar className="size-14 rounded-xl">
            <AvatarFallback className="rounded-xl bg-indigo-500/10 text-lg font-bold text-indigo-600 dark:text-indigo-400">
              {initials}
            </AvatarFallback>
          </Avatar>

          <Badge variant="secondary">
            <BriefcaseBusiness className="mr-1 size-3.5" />
            {openJobs} {openJobs === 1 ? "Job" : "Jobs"}
          </Badge>
        </div>

        <div className="space-y-2">
          <CardTitle>
            <Link
              href={`/companies/${company.slug}`}
              className="hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              {company.name}
            </Link>
          </CardTitle>

          <CardDescription>
            {company.industry}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-4">
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {company.description}
        </p>

        <div className="mt-auto space-y-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="size-4" />
            {company.location}
          </div>

          <div className="flex items-center gap-2">
            <Users className="size-4" />
            {company.size}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-wrap items-center justify-between gap-3 border-t pt-4">
        <Button asChild size="sm" variant="outline">
          <Link href={`/companies/${company.slug}`}>
            View Company
            <ArrowUpRight className="ml-1 size-4" />
          </Link>
        </Button>

        <Link
          href={`/jobs?q=${encodeURIComponent(company.name)}`}
          className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          View Jobs
        </Link>
      </CardFooter>
    </Card>
  );
}
