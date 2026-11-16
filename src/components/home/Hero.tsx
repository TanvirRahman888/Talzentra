
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, MapPin, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const popularSearches = [
  "Frontend Developer",
  "UI/UX Designer",
  "React Developer",
  "Internship",
];

export default function Hero() {
  const router = useRouter();

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("all");

  const searchJobs = (searchTerm = keyword) => {
    const params = new URLSearchParams();

    const trimmedKeyword = searchTerm.trim();

    if (trimmedKeyword) {
      params.set("q", trimmedKeyword);
    }

    if (location !== "all") {
      params.set("location", location);
    }

    const query = params.toString();

    router.push(query ? `/jobs?${query}` : "/jobs");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchJobs();
  };

  return (
    <section className="relative overflow-hidden bg-background px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">

      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 size-96 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-400/10"
      />

      <div className="relative mx-auto max-w-7xl">

        {/* Hero content */}
        <div className="mx-auto max-w-4xl text-center">

          {/* Top badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-xs font-medium text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300">
            <span className="size-2 rounded-full bg-indigo-500" />
            Your career journey starts here
            <ArrowUpRight className="size-3.5" />
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Find Your Next{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              Career Opportunity
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            Discover opportunities, connect with leading
            employers, and take the next step in your career
            with Talzentra.
          </p>
        </div>

        {/* Search form */}
        <form
          onSubmit={handleSubmit}
          role="search"
          className="mx-auto mt-10 flex max-w-4xl flex-col gap-3 rounded-2xl border border-border bg-card p-3 shadow-lg shadow-indigo-500/5 sm:p-4 md:flex-row md:items-center"
        >
          {/* Keyword search */}
          <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
            <Search className="size-5 shrink-0 text-muted-foreground" />

            <label htmlFor="job-keyword" className="sr-only">
              Search jobs by keyword
            </label>

            <Input
              id="job-keyword"
              type="search"
              placeholder="Job title, skills, or company"
              value={keyword}
              onChange={(event) =>
                setKeyword(event.target.value)
              }
              className="h-12 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
            />
          </div>

          {/* Location selector */}
          <div className="flex items-center gap-2 border-t border-border px-3 pt-3 md:w-52 md:border-t-0 md:border-l md:pt-0">
            <MapPin className="size-5 shrink-0 text-muted-foreground" />

            <Select
              value={location}
              onValueChange={setLocation}
            >
              <SelectTrigger
                aria-label="Job location"
                className="h-12 w-full border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
              >
                <SelectValue placeholder="All locations" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">
                  All locations
                </SelectItem>
                <SelectItem value="Dhaka">
                  Dhaka
                </SelectItem>
                <SelectItem value="Chattogram">
                  Chattogram
                </SelectItem>
                <SelectItem value="Sylhet">
                  Sylhet
                </SelectItem>
                <SelectItem value="Remote">
                  Remote
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search button */}
          <Button
            type="submit"
            size="lg"
            className="h-12 bg-indigo-600 px-7 text-white hover:bg-indigo-700"
          >
            <Search className="mr-2 size-4" />
            Search Jobs
          </Button>
        </form>

        {/* Popular searches */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="mr-1 text-sm text-muted-foreground">
            Popular searches:
          </span>

          {popularSearches.map((term) => (
            <Button
              key={term}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setKeyword(term);
                searchJobs(term);
              }}
              className="rounded-full text-xs"
            >
              {term}
            </Button>
          ))}
        </div>

      </div>
    </section>
  );
}
