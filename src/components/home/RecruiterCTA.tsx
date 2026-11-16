
import Link from "next/link";

import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  FilePlus2,
  UserCheck,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Benefits for recruiters.
const benefits = [
  "Create a professional company profile.",
  "Post and manage job openings.",
  "Review applications in one place.",
  "Manage candidates through hiring stages.",
];

// Recruiter workflow preview.
const recruitmentSteps = [
  {
    title: "Create Company Profile",
    description: "Introduce your organization.",
    icon: Building2,
  },
  {
    title: "Publish Job Openings",
    description: "Submit vacancies for approval.",
    icon: FilePlus2,
  },
  {
    title: "Review Candidates",
    description: "Manage incoming applications.",
    icon: Users,
  },
  {
    title: "Hire the Right Talent",
    description: "Move candidates through hiring stages.",
    icon: UserCheck,
  },
];

export default function RecruiterCTA() {
  return (
    <section
      aria-labelledby="recruiter-cta-heading"
      className="bg-background px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">

        {/* Main CTA Container */}
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-indigo-700 via-indigo-600 to-violet-700 p-6 text-white sm:p-10 lg:p-14">

          {/* Decorative background effects */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-28 -right-24 size-80 rounded-full bg-white/10 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -left-20 size-72 rounded-full bg-violet-300/15 blur-3xl"
          />

          {/* Responsive Two-Column Layout */}
          <div className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-14">

            {/* Left: Content */}
            <div className="space-y-6">

              {/* Badge */}
              <Badge className="border border-white/20 bg-white/10 px-3 py-1.5 text-white hover:bg-white/10">
                <Building2 className="mr-2 size-4" />
                For Employers & Recruiters
              </Badge>

              {/* Headline */}
              <div className="space-y-4">
                <h2
                  id="recruiter-cta-heading"
                  className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
                >
                  Hire the Right Talent.
                  <span className="mt-2 block text-indigo-100">
                    Grow Your Business.
                  </span>
                </h2>

                <p className="max-w-xl text-base leading-8 text-indigo-100 sm:text-lg">
                  Find the professionals your business
                  needs. Talzentra is designed to help
                  recruiters publish vacancies, review
                  applicants, and manage hiring in one
                  convenient platform.
                </p>
              </div>

              {/* Benefits */}
              <ul className="grid gap-3">
                {benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="mt-1 size-5 shrink-0 text-cyan-200" />

                    <span className="text-sm leading-7 text-white/90 sm:text-base">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3 pt-3 sm:flex-row sm:flex-wrap">

                <Button
                  asChild
                  size="lg"
                  className="h-12 bg-white px-7 text-indigo-700 hover:bg-indigo-50"
                >
                  <Link href="/sign-up?role=recruiter">
                    Get Started
                    <ArrowUpRight className="ml-2 size-4" />
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 border-white/40 bg-transparent px-7 text-white hover:bg-white/10 hover:text-white"
                >
                  <Link href="/#how-it-works">
                    How It Works
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </div>

              <p className="text-xs leading-5 text-indigo-100/80">
                Recruiter registration and hiring
                features are coming in later
                development stages.
              </p>
            </div>

            {/* Right: Recruitment Workflow Preview */}
            <div className="w-full min-w-0">
              <Card className="gap-5 border-white/20 bg-card text-card-foreground shadow-2xl shadow-indigo-950/20">

                <CardHeader className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <CardTitle className="text-lg sm:text-xl">
                      Recruitment Workflow
                    </CardTitle>

                    <Badge variant="secondary">
                      Preview
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    A simpler way to organize your
                    hiring process.
                  </p>
                </CardHeader>

                <CardContent>
                  <ol className="space-y-4">
                    {recruitmentSteps.map((step, index) => {
                      const Icon = step.icon;

                      return (
                        <li
                          key={step.title}
                          className="flex items-center gap-4 rounded-xl border border-border bg-muted/30 p-3 transition-colors hover:bg-accent"
                        >
                          {/* Step Icon */}
                          <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                            <Icon className="size-5" />
                          </div>

                          {/* Step Information */}
                          <div className="min-w-0 flex-1">
                            <h3 className="text-sm font-semibold text-foreground">
                              {step.title}
                            </h3>

                            <p className="mt-1 text-xs leading-5 text-muted-foreground">
                              {step.description}
                            </p>
                          </div>

                          {/* Step Number */}
                          <span className="text-xs font-semibold text-muted-foreground">
                            {String(index + 1).padStart(
                              2,
                              "0"
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ol>

                  <p className="mt-5 text-center text-xs text-muted-foreground">
                    Illustrative workflow — not live
                    recruitment activity.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
