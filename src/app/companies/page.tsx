
import { Suspense } from "react";
import type { Metadata } from "next";
import CompaniesExplorer from "@/components/company/CompaniesExplorer";


export const metadata: Metadata = {
  title: "Explore Companies | Talzentra",
  description:
    "Discover companies, explore industries, and find career opportunities on Talzentra.",
};

export default function CompaniesPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-7xl px-4 py-16">
          <p className="text-muted-foreground">
            Loading companies...
          </p>
        </main>
      }
    >
      <CompaniesExplorer />
    </Suspense>
  );
}
