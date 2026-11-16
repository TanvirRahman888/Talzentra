
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";

import { jobs } from "@/data/jobs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type JobDetailsProps = {
  params: Promise<{ slug: string }>;
};

export default async function JobDetailsPage({
  params,
}: JobDetailsProps) {
  const { slug } = await params;

  const job = jobs.find(
    (item) => item.slug === slug
  );

  if (!job) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/jobs">
          <ArrowLeft className="mr-2 size-4" />
          Back to Jobs
        </Link>
      </Button>

      <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
        <div className="mb-4 flex flex-wrap gap-2">
          <Badge variant="secondary">
            {job.employmentType}
          </Badge>
          <Badge variant="outline">
            {job.workMode}
          </Badge>
        </div>

        <h1 className="text-3xl font-bold text-foreground">
          {job.title}
        </h1>

        <p className="mt-2 text-muted-foreground">
          {job.company}
        </p>

        <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="size-4" />
          {job.location}
        </p>

        <p className="mt-5 text-lg font-semibold">
          {job.salary ?? "Salary not disclosed"}
        </p>

        <h2 className="mt-10 text-xl font-semibold">
          Job Description
        </h2>

        <p className="mt-3 leading-7 text-muted-foreground">
          {job.description}
        </p>

        <h2 className="mt-8 text-xl font-semibold">
          Required Skills
        </h2>

        <div className="mt-4 flex flex-wrap gap-2">
          {job.skills.map((skill) => (
            <Badge key={skill} variant="outline">
              {skill}
            </Badge>
          ))}
        </div>

        <p className="mt-10 text-sm text-muted-foreground">
          Applications will be available after
          authentication and backend integration.
        </p>
      </div>
    </main>
  );
}
