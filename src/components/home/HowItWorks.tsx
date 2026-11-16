
"use client";

import Link from "next/link";

import {
  ArrowRight,
  Building2,
  ClipboardCheck,
  FilePlus2,
  Search,
  Send,
  UserCheck,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

// Define the shape of each step.
type ProcessStep = {
  title: string;
  description: string;
  icon: LucideIcon;
};

// Job Seeker steps.
const seekerSteps: ProcessStep[] = [
  {
    title: "Create Your Profile",
    description:
      "Build your professional profile, highlight your skills, and prepare your resume.",
    icon: UserRound,
  },
  {
    title: "Discover Jobs",
    description:
      "Search and filter opportunities based on your skills, location, and interests.",
    icon: Search,
  },
  {
    title: "Apply for Jobs",
    description:
      "Submit applications to employers and share your professional qualifications.",
    icon: Send,
  },
  {
    title: "Track Applications",
    description:
      "Monitor your application status and follow your recruitment journey.",
    icon: ClipboardCheck,
  },
];

// Recruiter steps.
const recruiterSteps: ProcessStep[] = [
  {
    title: "Register Your Company",
    description:
      "Create an employer account and establish your professional company profile.",
    icon: Building2,
  },
  {
    title: "Post Job Openings",
    description:
      "Create vacancies and submit job listings for platform approval.",
    icon: FilePlus2,
  },
  {
    title: "Review Candidates",
    description:
      "Explore submitted applications and shortlist qualified candidates.",
    icon: Users,
  },
  {
    title: "Hire the Right Talent",
    description:
      "Manage the recruitment process and identify the best candidates.",
    icon: UserCheck,
  },
];

// Reusable component for the steps.
function ProcessSteps({
  steps,
}: {
  steps: ProcessStep[];
}) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => {
        const Icon = step.icon;

        return (
          <Card
            key={step.title}
            className="group h-full gap-0 border-border/70 bg-card py-0 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/5"
          >
            <CardContent className="flex h-full flex-col gap-4 p-6">

              {/* Step Icon and Number */}
              <div className="flex items-center justify-between">
                <div className="flex size-14 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white dark:text-indigo-400 dark:group-hover:text-white">
                  <Icon className="size-7" />
                </div>

                <span className="text-3xl font-bold text-muted-foreground/20">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Step Information */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground">
                  {step.title}
                </h3>

                <p className="text-sm leading-7 text-muted-foreground">
                  {step.description}
                </p>
              </div>

              {/* Step Indicator */}
              <div className="mt-auto pt-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Step {index + 1}
                </span>
              </div>

            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="bg-muted/30 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Simple & Seamless Process
          </p>

          <h2
            id="how-it-works-heading"
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            How{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              Talzentra
            </span>{" "}
            Works
          </h2>

          <p className="mt-4 leading-7 text-muted-foreground">
            Whether you are searching for your next career
            opportunity or hiring talented professionals,
            Talzentra is designed to simplify the process.
          </p>
        </div>

        {/* Interactive Role Tabs */}
        <Tabs
          defaultValue="seeker"
          className="w-full"
        >
          <TabsList className="mx-auto mb-10 grid h-12 w-full max-w-md grid-cols-2">
            <TabsTrigger
              value="seeker"
              className="gap-2 text-xs sm:text-sm"
            >
              <UserRound className="size-4" />
              Job Seekers
            </TabsTrigger>

            <TabsTrigger
              value="recruiter"
              className="gap-2 text-xs sm:text-sm"
            >
              <Building2 className="size-4" />
              Recruiters
            </TabsTrigger>
          </TabsList>

          {/* Job Seekers Tab */}
          <TabsContent
            value="seeker"
            className="space-y-10"
          >
            <ProcessSteps steps={seekerSteps} />

            <div className="flex flex-col items-center gap-3 text-center">
              <p className="text-sm text-muted-foreground">
                Ready to explore your next opportunity?
              </p>

              <Button
                asChild
                size="lg"
                className="bg-indigo-600 px-8 text-white hover:bg-indigo-700"
              >
                <Link href="/jobs">
                  Explore Jobs
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </TabsContent>

          {/* Recruiters Tab */}
          <TabsContent
            value="recruiter"
            className="space-y-10"
          >
            <ProcessSteps steps={recruiterSteps} />

            <div className="flex flex-col items-center gap-3 text-center">
              <p className="text-sm text-muted-foreground">
                Discover how opportunities are presented
                on Talzentra.
              </p>

              <Button
                asChild
                size="lg"
                className="bg-indigo-600 px-8 text-white hover:bg-indigo-700"
              >
                <Link href="/companies">
                  Explore Company Profiles
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Development Status Note */}
        <p className="mx-auto mt-8 max-w-xl text-center text-xs leading-5 text-muted-foreground">
          Account registration, job applications, and
          recruiter management features are coming
          in future development stages.
        </p>

      </div>
    </section>
  );
}
