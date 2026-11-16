
"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  BriefcaseBusiness,
} from "lucide-react";

import { jobs } from "@/data/jobs";
import JobCard from "@/components/jobs/JobCard";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Number of jobs displayed on each page.
const PAGE_SIZE = 4;

// All filter options.
const filterGroups = [
  {
    key: "category",
    label: "Category",
    options: [
      { value: "all", label: "All Categories" },
      { value: "software-development", label: "Software Development" },
      { value: "design-creative", label: "Design & Creative" },
      { value: "marketing", label: "Marketing" },
      { value: "sales-business", label: "Sales & Business" },
      { value: "finance-accounting", label: "Finance & Accounting" },
      { value: "healthcare", label: "Healthcare" },
      { value: "education", label: "Education" },
      { value: "customer-support", label: "Customer Support" },
    ],
  },
  {
    key: "location",
    label: "Location",
    options: [
      { value: "all", label: "All Locations" },
      { value: "Dhaka", label: "Dhaka" },
      { value: "Chattogram", label: "Chattogram" },
      { value: "Sylhet", label: "Sylhet" },
      { value: "Remote", label: "Remote" },
    ],
  },
  {
    key: "type",
    label: "Employment Type",
    options: [
      { value: "all", label: "All Types" },
      { value: "Full-time", label: "Full-time" },
      { value: "Part-time", label: "Part-time" },
      { value: "Internship", label: "Internship" },
      { value: "Contract", label: "Contract" },
    ],
  },
  {
    key: "mode",
    label: "Work Mode",
    options: [
      { value: "all", label: "All Modes" },
      { value: "Remote", label: "Remote" },
      { value: "Hybrid", label: "Hybrid" },
      { value: "On-site", label: "On-site" },
    ],
  },
];

// Reusable filters for desktop and mobile.
type FilterPanelProps = {
  prefix: string;
  getValue: (key: string) => string;
  updateFilter: (key: string, value: string) => void;
  clearFilters: () => void;
};

function FilterPanel({
  prefix,
  getValue,
  updateFilter,
  clearFilters,
}: FilterPanelProps) {
  return (
    <div className="space-y-6">

      {/* Dropdown filters */}
      {filterGroups.map((group) => (
        <div key={group.key} className="space-y-2">
          <p className="text-sm font-medium">
            {group.label}
          </p>

          <Select
            value={getValue(group.key)}
            onValueChange={(value) =>
              updateFilter(group.key, value)
            }
          >
            <SelectTrigger
              aria-label={group.label}
              className="w-full"
            >
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {group.options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}

      {/* Featured jobs */}
      <div className="flex items-center gap-3">
        <Checkbox
          id={`${prefix}-featured`}
          checked={getValue("featured") === "true"}
          onCheckedChange={(checked) =>
            updateFilter(
              "featured",
              checked === true ? "true" : "all"
            )
          }
        />

        <label
          htmlFor={`${prefix}-featured`}
          className="cursor-pointer text-sm font-medium"
        >
          Featured Jobs Only
        </label>
      </div>

      {/* Reset */}
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={clearFilters}
      >
        Clear All Filters
      </Button>
    </div>
  );
}

export default function JobsExplorer() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryFromUrl = searchParams.get("q") ?? "";

  const [keyword, setKeyword] = useState(queryFromUrl);

  // Keep input synchronized with the URL.
  useEffect(() => {
    setKeyword(queryFromUrl);
  }, [queryFromUrl]);

  // Read filter values.
  const getValue = (key: string) => {
    return searchParams.get(key) ?? "all";
  };

  // Update filters while preserving other parameters.
  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (!value || value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    // Reset pagination when filters change.
    params.delete("page");

    const query = params.toString();

    router.replace(
      query ? `/jobs?${query}` : "/jobs",
      { scroll: false }
    );
  };

  // Submit keyword search.
  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateFilter("q", keyword.trim());
  };

  // Clear all filters.
  const clearFilters = () => {
    setKeyword("");
    router.replace("/jobs", { scroll: false });
  };

  // Read active filters.
  const searchTerm = queryFromUrl.trim().toLowerCase();
  const category = searchParams.get("category");
  const location = searchParams.get("location");
  const type = searchParams.get("type");
  const mode = searchParams.get("mode");
  const featured = searchParams.get("featured") === "true";
  const sort = searchParams.get("sort") ?? "newest";

  // Filter sample jobs.
  const filteredJobs = jobs.filter((job) => {
    const searchableText = [
      job.title,
      job.company,
      job.description,
      job.location,
      ...job.skills,
    ]
      .join(" ")
      .toLowerCase();

    const matchesKeyword =
      !searchTerm || searchableText.includes(searchTerm);

    const matchesCategory =
      !category || job.category === category;

    const matchesLocation =
      !location ||
      (location === "Remote"
        ? job.workMode === "Remote"
        : job.location
            .toLowerCase()
            .includes(location.toLowerCase()));

    const matchesType =
      !type || job.employmentType === type;

    const matchesMode =
      !mode || job.workMode === mode;

    const matchesFeatured =
      !featured || job.featured;

    return (
      matchesKeyword &&
      matchesCategory &&
      matchesLocation &&
      matchesType &&
      matchesMode &&
      matchesFeatured
    );
  });

  // Sort without modifying the original jobs array.
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sort === "oldest") {
      return a.postedAt.localeCompare(b.postedAt);
    }

    if (sort === "title-az") {
      return a.title.localeCompare(b.title);
    }

    if (sort === "title-za") {
      return b.title.localeCompare(a.title);
    }

    return b.postedAt.localeCompare(a.postedAt);
  });

  // Calculate pagination.
  const totalPages = Math.max(
    1,
    Math.ceil(sortedJobs.length / PAGE_SIZE)
  );

  const requestedPage = Number(
    searchParams.get("page") ?? "1"
  );

  const currentPage = Number.isFinite(requestedPage)
    ? Math.min(
        totalPages,
        Math.max(1, Math.floor(requestedPage))
      )
    : 1;

  const startIndex = (currentPage - 1) * PAGE_SIZE;

  const paginatedJobs = sortedJobs.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  // Navigate between pages.
  const goToPage = (page: number) => {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }

    const query = params.toString();

    router.push(query ? `/jobs?${query}` : "/jobs");
  };

  const activeFilterCount = [
    "q",
    "category",
    "location",
    "type",
    "mode",
    "featured",
  ].filter((key) => Boolean(searchParams.get(key))).length;

  return (
    <main className="min-h-screen bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Page Heading */}
        <div className="mb-8 space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Discover Opportunities
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Explore{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              Jobs
            </span>
          </h1>

          <p className="max-w-2xl text-muted-foreground">
            Find the right opportunity for your skills,
            interests, and career goals.
          </p>
        </div>

        {/* Keyword Search */}
        <form
          onSubmit={handleSearch}
          role="search"
          className="mb-8 flex flex-col gap-3 sm:flex-row"
        >
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground" />

            <label htmlFor="jobs-keyword" className="sr-only">
              Search jobs
            </label>

            <Input
              id="jobs-keyword"
              type="search"
              placeholder="Search by job title, company, or skill..."
              value={keyword}
              onChange={(event) =>
                setKeyword(event.target.value)
              }
              className="h-12 bg-card pl-12"
            />
          </div>

          <Button
            type="submit"
            className="h-12 bg-indigo-600 px-8 text-white hover:bg-indigo-700"
          >
            <Search className="mr-2 size-4" />
            Search Jobs
          </Button>
        </form>

        {/* Sidebar and Results */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-xl border border-border bg-card p-5">
              <div className="mb-6 flex items-center gap-2">
                <SlidersHorizontal className="size-5" />
                <h2 className="text-lg font-semibold">
                  Filter Jobs
                </h2>
              </div>

              <FilterPanel
                prefix="desktop"
                getValue={getValue}
                updateFilter={updateFilter}
                clearFilters={clearFilters}
              />
            </div>
          </aside>

          {/* Job Results */}
          <div className="min-w-0">

            {/* Results toolbar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">
                  Available Jobs
                </h2>

                <p className="text-sm text-muted-foreground">
                  {sortedJobs.length === 0
                    ? "No jobs found"
                    : `Showing ${startIndex + 1}–${Math.min(
                        startIndex + PAGE_SIZE,
                        sortedJobs.length
                      )} of ${sortedJobs.length} jobs`}
                </p>
              </div>

              <div className="flex items-center gap-2">

                {/* Mobile Filter Sheet */}
                <div className="lg:hidden">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline">
                        <SlidersHorizontal className="mr-2 size-4" />
                        Filters
                        {activeFilterCount > 0 &&
                          ` (${activeFilterCount})`}
                      </Button>
                    </SheetTrigger>

                    <SheetContent
                      side="left"
                      className="w-[90vw] max-w-sm overflow-y-auto"
                    >
                      <SheetHeader>
                        <SheetTitle>Filter Jobs</SheetTitle>
                        <SheetDescription>
                          Refine your job search.
                        </SheetDescription>
                      </SheetHeader>

                      <div className="px-4 pb-6">
                        <FilterPanel
                          prefix="mobile"
                          getValue={getValue}
                          updateFilter={updateFilter}
                          clearFilters={clearFilters}
                        />
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>

                {/* Sorting */}
                <Select
                  value={sort}
                  onValueChange={(value) =>
                    updateFilter("sort", value)
                  }
                >
                  <SelectTrigger
                    aria-label="Sort jobs"
                    className="w-40 sm:w-44"
                  >
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="newest">
                      Newest First
                    </SelectItem>

                    <SelectItem value="oldest">
                      Oldest First
                    </SelectItem>

                    <SelectItem value="title-az">
                      Title A–Z
                    </SelectItem>

                    <SelectItem value="title-za">
                      Title Z–A
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Job Cards */}
            {paginatedJobs.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                {paginatedJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="flex min-h-80 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card p-8 text-center">
                <BriefcaseBusiness className="mb-4 size-12 text-muted-foreground" />

                <h3 className="text-xl font-semibold">
                  No Jobs Found
                </h3>

                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  Try changing your search keywords or
                  removing some filters.
                </p>

                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="mt-5"
                >
                  Clear All Filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <nav
                aria-label="Job results pagination"
                className="mt-10 flex flex-wrap items-center justify-center gap-2"
              >
                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === 1}
                  onClick={() =>
                    goToPage(currentPage - 1)
                  }
                  aria-label="Previous page"
                >
                  <ChevronLeft className="size-4" />
                </Button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (
                  <Button
                    key={page}
                    size="icon"
                    variant={
                      currentPage === page
                        ? "default"
                        : "outline"
                    }
                    className={
                      currentPage === page
                        ? "bg-indigo-600 text-white hover:bg-indigo-700"
                        : ""
                    }
                    aria-label={`Page ${page}`}
                    aria-current={
                      currentPage === page
                        ? "page"
                        : undefined
                    }
                    onClick={() => goToPage(page)}
                  >
                    {page}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    goToPage(currentPage + 1)
                  }
                  aria-label="Next page"
                >
                  <ChevronRight className="size-4" />
                </Button>
              </nav>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
