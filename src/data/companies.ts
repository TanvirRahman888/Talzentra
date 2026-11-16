export type Company = {
  id: number;
  slug: string;
  name: string;
  industry: string;
  location: string;
  size: string;
  description: string;
  tagline?: string;
  foundedYear?: number;
  website?: string;
  contactEmail?: string;
  contactPhone?: string;
  logoUrl?: string;
};

export const companies: Company[] = [
  {
    id: 1,
    slug: "arcstone-digital",
    name: "Arcstone Digital",
    industry: "Information Technology",
    location: "Dhaka, Bangladesh",
    size: "51–200 employees",
    description: "Building modern digital products and scalable web solutions.",
    tagline: "Building thoughtful digital experiences.",
    foundedYear: 2019,
    website: "https://example.com",
    contactEmail: "careers@example.com",
  },
  {
    id: 2,
    slug: "novaharbor-studio",
    name: "NovaHarbor Studio",
    industry: "Design & Creative",
    location: "Chattogram, Bangladesh",
    size: "11–50 employees",
    description: "Creating meaningful digital experiences through design.",
  },
  {
    id: 3,
    slug: "codelume-systems",
    name: "CodeLume Systems",
    industry: "Software Development",
    location: "Dhaka, Bangladesh",
    size: "51–200 employees",
    description: "Developing reliable software and cloud-based solutions.",
  },
  {
    id: 4,
    slug: "devcrest-labs",
    name: "DevCrest Labs",
    industry: "Software Development",
    location: "Dhaka, Bangladesh",
    size: "11–50 employees",
    description: "Helping growing businesses build better technology.",
  },
  {
    id: 5,
    slug: "brandpeak-media",
    name: "BrandPeak Media",
    industry: "Marketing & Advertising",
    location: "Sylhet, Bangladesh",
    size: "11–50 employees",
    description: "Supporting businesses through creative marketing strategies.",
  },
  {
    id: 6,
    slug: "clientora",
    name: "Clientora",
    industry: "Customer Experience",
    location: "Remote, Bangladesh",
    size: "51–200 employees",
    description:
      "Improving customer experiences through modern support solutions.",
  },
];
