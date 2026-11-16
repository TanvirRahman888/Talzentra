import FeaturedLatestJobs from "@/components/home/FeaturedLatestJobs";
import Hero from "@/components/home/Hero";
import JobCategories from "@/components/home/JobCategories";
import TopCompanies from "@/components/home/TopCompanies";

export default function Home() {
  return (
    <>
      <Hero />
      <JobCategories />
      <FeaturedLatestJobs />
      <TopCompanies />
    </>
  );
}
