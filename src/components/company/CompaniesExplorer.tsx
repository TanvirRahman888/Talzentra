
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { FormEvent } from "react";

import {
  Building2,
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import { companies } from "@/data/companies";
import { jobs } from "@/data/jobs";
import CompanyCard from "@/components/company/CompanyCard";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

const PAGE_SIZE = 4;

// Build filter options from existing company data.
const industries = [...new Set(
  companies.map((company) => company.industry)
)].sort();

const locations = [...new Set(
  companies.map((company) =>
    company.location.split(",")[0].trim()
  )
)].sort();

type FilterPanelProps = {
  industry: string;
  location: string;
  updateFilter: (key: string, value: string) => void;
  clearFilters: () => void;
};

function FilterPanel({
  industry,
  location,
  updateFilter,
  clearFilters,
}: FilterPanelProps) {
  return (
    <div className="space-y-6">

      {/* Industry */}
      <div className="space-y-2">
        <p className="text-sm font-medium">Industry</p>

        <Select
          value={industry}
          onValueChange={(value) =>
            updateFilter("industry", value)
          }
        >
          <SelectTrigger
            aria-label="Filter by industry"
            className="w-full"
          >
            <SelectValue placeholder="All Industries" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">
              All Industries
            </SelectItem>

            {industries.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <p className="text-sm font-medium">Location</p>

        <Select
          value={location}
          onValueChange={(value) =>
            updateFilter("location", value)
          }
        >
          <SelectTrigger
            aria-label="Filter by location"
            className="w-full"
          >
            <SelectValue placeholder="All Locations" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">
              All Locations
            </SelectItem>

            {locations.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

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

export default function CompaniesExplorer() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const keyword = searchParams.get("q") ?? "";
  const industry = searchParams.get("industry") ?? "all";
  const location = searchParams.get("location") ?? "all";
  const sort = searchParams.get("sort") ?? "name-asc";

  // Update one URL parameter without losing the others.
  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (
      !value ||
      value === "all" ||
      (key === "sort" && value === "name-asc")
    ) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    // Filtering and sorting return to page one.
    params.delete("page");

    const query = params.toString();

    router.replace(
      query ? `/companies?${query}` : "/companies",
      { scroll: false }
    );
  };

  // Search by company information.
  const handleSearch = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const value = String(formData.get("q") ?? "").trim();

    updateFilter("q", value);
  };

  const clearFilters = () => {
    router.replace("/companies", { scroll: false });
  };

  // Calculate job counts from our sample jobs.
  const companiesWithCounts = companies.map((company) => ({
    company,
    openJobs: jobs.filter(
      (job) => job.company === company.name
    ).length,
  }));

  // Apply search and filters.
  const filteredCompanies = companiesWithCounts.filter(
    ({ company }) => {
      const searchableText = [
        company.name,
        company.industry,
        company.location,
        company.description,
      ]
        .join(" ")
        .toLowerCase();

      const matchesKeyword =
        !keyword.trim() ||
        searchableText.includes(keyword.trim().toLowerCase());

      const matchesIndustry =
        industry === "all" ||
        company.industry === industry;

      const matchesLocation =
        location === "all" ||
        company.location
          .toLowerCase()
          .includes(location.toLowerCase());

      return (
        matchesKeyword &&
        matchesIndustry &&
        matchesLocation
      );
    }
  );

  // Sort filtered companies.
  const sortedCompanies = [...filteredCompanies].sort(
    (a, b) => {
      if (sort === "name-desc") {
        return b.company.name.localeCompare(a.company.name);
      }

      if (sort === "jobs-most") {
        return (
          b.openJobs - a.openJobs ||
          a.company.name.localeCompare(b.company.name)
        );
      }

      if (sort === "jobs-fewest") {
        return (
          a.openJobs - b.openJobs ||
          a.company.name.localeCompare(b.company.name)
        );
      }

      return a.company.name.localeCompare(b.company.name);
    }
  );

  // Pagination.
  const totalPages = Math.max(
    1,
    Math.ceil(sortedCompanies.length / PAGE_SIZE)
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

  const paginatedCompanies = sortedCompanies.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

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

    router.push(
      query ? `/companies?${query}` : "/companies"
    );
  };

  const activeFilterCount = [
    "q",
    "industry",
    "location",
  ].filter((key) => {
    const value = searchParams.get(key);
    return Boolean(value && value !== "all");
  }).length;

  return (
    <main className="min-h-screen bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Discover Great Workplaces
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Explore{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              Companies
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-muted-foreground">
            Discover organizations, explore industries,
            and find companies that match your career goals.
          </p>
        </div>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          role="search"
          className="mb-8 flex flex-col gap-3 sm:flex-row"
        >
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground" />

            <label
              htmlFor="company-search"
              className="sr-only"
            >
              Search companies
            </label>

            <Input
              key={keyword}
              id="company-search"
              name="q"
              type="search"
              defaultValue={keyword}
              placeholder="Search by company name, industry, or location..."
              className="h-12 bg-card pl-12"
            />
          </div>

          <Button
            type="submit"
            className="h-12 bg-indigo-600 px-8 text-white hover:bg-indigo-700"
          >
            <Search className="mr-2 size-4" />
            Search Companies
          </Button>
        </form>

        {/* Sidebar and Results */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[250px_minmax(0,1fr)]">

          {/* Desktop Filters */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-xl border border-border bg-card p-5">
              <h2 className="mb-6 flex items-center gap-2 text-lg font-semibold">
                <SlidersHorizontal className="size-5" />
                Filter Companies
              </h2>

              <FilterPanel
                industry={industry}
                location={location}
                updateFilter={updateFilter}
                clearFilters={clearFilters}
              />
            </div>
          </aside>

          {/* Results */}
          <div className="min-w-0">

            {/* Results Toolbar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">
                  Companies
                </h2>

                <p className="text-sm text-muted-foreground">
                  {sortedCompanies.length === 0
                    ? "No companies found"
                    : `Showing ${startIndex + 1}–${Math.min(
                        startIndex + PAGE_SIZE,
                        sortedCompanies.length
                      )} of ${sortedCompanies.length} companies`}
                </p>
              </div>

              <div className="flex items-center gap-2">

                {/* Mobile Filters */}
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
                        <SheetTitle>
                          Filter Companies
                        </SheetTitle>

                        <SheetDescription>
                          Refine your company search.
                        </SheetDescription>
                      </SheetHeader>

                      <div className="px-4 pb-6">
                        <FilterPanel
                          industry={industry}
                          location={location}
                          updateFilter={updateFilter}
                          clearFilters={clearFilters}
                        />
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>

                {/* Sort */}
                <Select
                  value={sort}
                  onValueChange={(value) =>
                    updateFilter("sort", value)
                  }
                >
                  <SelectTrigger
                    aria-label="Sort companies"
                    className="w-40 sm:w-48"
                  >
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="name-asc">
                      Name A–Z
                    </SelectItem>

                    <SelectItem value="name-desc">
                      Name Z–A
                    </SelectItem>

                    <SelectItem value="jobs-most">
                      Most Jobs
                    </SelectItem>

                    <SelectItem value="jobs-fewest">
                      Fewest Jobs
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Company Grid */}
            {paginatedCompanies.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {paginatedCompanies.map(
                  ({ company, openJobs }) => (
                    <CompanyCard
                      key={company.id}
                      company={company}
                      openJobs={openJobs}
                    />
                  )
                )}
              </div>
            ) : (
              <div className="flex min-h-80 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card p-8 text-center">
                <Building2 className="mb-4 size-12 text-muted-foreground" />

                <h3 className="text-xl font-semibold">
                  No Companies Found
                </h3>

                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  Try different keywords or remove
                  some of your filters.
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
                aria-label="Companies pagination"
                className="mt-10 flex flex-wrap items-center justify-center gap-2"
              >
                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                  onClick={() =>
                    goToPage(currentPage - 1)
                  }
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
                  aria-label="Next page"
                  onClick={() =>
                    goToPage(currentPage + 1)
                  }
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
