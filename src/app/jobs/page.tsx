
import { Suspense } from "react";
import type { Metadata } from "next";
import JobsExplorer from "@/components/jobs/JobsExplorer";



export const metadata: Metadata = {
  title: "Explore Jobs | Talzentra",
  description:
    "Discover job opportunities, search careers, and connect with employers on Talzentra.",
};

export default function JobsPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-7xl px-4 py-16">
          <p className="text-muted-foreground">
            Loading job listings...
          </p>
        </main>
      }
    >
      <JobsExplorer />
    </Suspense>
  );
}
