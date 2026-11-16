import FeaturedLatestJobs from "@/components/home/FeaturedLatestJobs";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import JobCategories from "@/components/home/JobCategories";
import RecruiterCTA from "@/components/home/RecruiterCTA";
import Testimonials from "@/components/home/Testimonials";
import TopCompanies from "@/components/home/TopCompanies";

export default function Home() {
  return (
    <>
      <Hero />
      <JobCategories />
      <FeaturedLatestJobs />
      <TopCompanies />
      <HowItWorks />
      <RecruiterCTA />
      <Testimonials />
    </>
  );
}
