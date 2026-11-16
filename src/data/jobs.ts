export type Job = {
  id: number;
  slug: string;
  title: string;
  company: string;
  location: string;
  category: string;
  workMode: "Remote" | "Hybrid" | "On-site";
  employmentType: "Full-time" | "Part-time" | "Internship" | "Contract";
  salary?: string;
  skills: string[];
  description: string;
  postedAt: string;
  featured: boolean;
  experienceLevel?: string;
  vacancies?: number;
  deadline?: string;

  responsibilities?: string[];
  requirements?: string[];
  benefits?: string[];

  companyInfo?: {
    industry: string;
    size: string;
    about: string;
    website?: string;
  };
};

// Fictional sample jobs for frontend development.
// Replace these with real approved jobs from your API later.

export const jobs: Job[] = [
  {
    id: 1,
    slug: "frontend-developer-arcstone",
    title: "Frontend Developer",
    company: "Arcstone Digital",
    location: "Dhaka, Bangladesh",
    category: "software-development",
    workMode: "Hybrid",
    employmentType: "Full-time",
    salary: "৳65,000 – ৳95,000 / month",
    skills: ["React", "Next.js", "TypeScript"],
    description:
      "Build responsive web interfaces and collaborate with a modern product team.",
    postedAt: "2026-11-13",
    featured: true,
    experienceLevel: "Mid Level",
    vacancies: 2,
    deadline: "2026-12-31",

    responsibilities: [
      "Build responsive and accessible web interfaces.",
      "Develop reusable React components.",
      "Integrate frontend applications with REST APIs.",
      "Collaborate with designers and backend developers.",
      "Improve application performance and usability.",
    ],

    requirements: [
      "Strong JavaScript and TypeScript knowledge.",
      "Experience with React and Next.js.",
      "Understanding of HTML, CSS, and Tailwind CSS.",
      "Experience integrating REST APIs.",
      "Familiarity with Git and GitHub.",
    ],

    benefits: [
      "Flexible working hours.",
      "Hybrid work opportunities.",
      "Professional development support.",
      "Annual performance review.",
      "Supportive team environment.",
    ],

    companyInfo: {
      industry: "Information Technology",
      size: "51–200 employees",
      about:
        "Arcstone Digital is a fictional technology company used for Talzentra's frontend demonstration.",
    },
  },
  {
    id: 2,
    slug: "ui-ux-designer-novaharbor",
    title: "UI/UX Designer",
    company: "NovaHarbor Studio",
    location: "Chattogram, Bangladesh",
    category: "design-creative",
    workMode: "Remote",
    employmentType: "Full-time",
    salary: "৳45,000 – ৳70,000 / month",
    skills: ["Figma", "UI Design", "Prototyping"],
    description:
      "Design user-friendly digital experiences and modern product interfaces.",
    postedAt: "2026-11-12",
    featured: true,
  },
  {
    id: 3,
    slug: "backend-developer-codelume",
    title: "Backend Developer",
    company: "CodeLume Systems",
    location: "Dhaka, Bangladesh",
    category: "software-development",
    workMode: "On-site",
    employmentType: "Full-time",
    salary: "৳75,000 – ৳105,000 / month",
    skills: ["Node.js", "Express", "MongoDB"],
    description: "Develop secure APIs and maintain scalable backend services.",
    postedAt: "2026-11-11",
    featured: true,
  },
  {
    id: 4,
    slug: "junior-react-developer-devcrest",
    title: "Junior React Developer",
    company: "DevCrest Labs",
    location: "Dhaka, Bangladesh",
    category: "software-development",
    workMode: "Hybrid",
    employmentType: "Full-time",
    salary: "৳35,000 – ৳55,000 / month",
    skills: ["JavaScript", "React", "Tailwind"],
    description:
      "Work with experienced developers to create interactive web applications.",
    postedAt: "2026-11-16",
    featured: false,
  },
  {
    id: 5,
    slug: "marketing-executive-brandpeak",
    title: "Digital Marketing Executive",
    company: "BrandPeak Media",
    location: "Sylhet, Bangladesh",
    category: "marketing",
    workMode: "On-site",
    employmentType: "Full-time",
    salary: "৳32,000 – ৳48,000 / month",
    skills: ["SEO", "Social Media", "Analytics"],
    description:
      "Plan digital campaigns and help businesses grow their online presence.",
    postedAt: "2026-11-15",
    featured: false,
  },
  {
    id: 6,
    slug: "customer-success-associate-clientora",
    title: "Customer Success Associate",
    company: "Clientora",
    location: "Remote, Bangladesh",
    category: "customer-support",
    workMode: "Remote",
    employmentType: "Full-time",
    skills: ["Communication", "CRM", "Support"],
    description:
      "Support customers and deliver an excellent service experience.",
    postedAt: "2026-11-14",
    featured: false,
  },
];
