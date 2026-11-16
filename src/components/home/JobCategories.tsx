
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Palette,
  Megaphone,
  TrendingUp,
  Landmark,
  HeartPulse,
  GraduationCap,
  Headset,
} from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

// Temporary category data.
// Later, categories can come from the Express API.
const categories = [
  {
    name: "Software Development",
    slug: "software-development",
    description: "Explore exciting careers in technology.",
    icon: Code2,
  },
  {
    name: "Design & Creative",
    slug: "design-creative",
    description: "Discover jobs for creative professionals.",
    icon: Palette,
  },
  {
    name: "Marketing",
    slug: "marketing",
    description: "Build brands and grow businesses.",
    icon: Megaphone,
  },
  {
    name: "Sales & Business",
    slug: "sales-business",
    description: "Find opportunities to drive growth.",
    icon: TrendingUp,
  },
  {
    name: "Finance & Accounting",
    slug: "finance-accounting",
    description: "Explore financial career opportunities.",
    icon: Landmark,
  },
  {
    name: "Healthcare",
    slug: "healthcare",
    description: "Discover meaningful healthcare roles.",
    icon: HeartPulse,
  },
  {
    name: "Education",
    slug: "education",
    description: "Shape futures through education.",
    icon: GraduationCap,
  },
  {
    name: "Customer Support",
    slug: "customer-support",
    description: "Help customers and build relationships.",
    icon: Headset,
  },
];

export default function JobCategories() {
  return (
    <section
      aria-labelledby="job-categories-heading"
      className="bg-muted/30 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Explore Opportunities
            </p>

            <h2
              id="job-categories-heading"
              className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Explore Jobs by{" "}
              <span className="text-indigo-600 dark:text-indigo-400">
                Category
              </span>
            </h2>

            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Find opportunities that match your skills,
              interests, and career ambitions.
            </p>
          </div>

          <Button variant="outline" asChild>
            <Link href="/jobs">
              Browse All Jobs
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.slug}
                href={`/jobs?category=${encodeURIComponent(category.slug)}`}
                className="group block h-full rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                <Card className="h-full gap-4 border-border/70 bg-card transition-all duration-300 group-hover:-translate-y-1 group-hover:border-indigo-500/40 group-hover:shadow-lg group-hover:shadow-indigo-500/5">
                  <CardHeader>
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex size-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white dark:text-indigo-400 dark:group-hover:text-white">
                        <Icon className="size-6" />
                      </div>

                      <ArrowUpRight className="size-5 text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-indigo-600" />
                    </div>

                    <CardTitle className="text-lg text-foreground transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                      {category.name}
                    </CardTitle>

                    <CardDescription className="mt-2 text-sm leading-6">
                      {category.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="mt-auto">
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                      Explore Jobs
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
