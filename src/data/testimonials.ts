
export type Testimonial = {
  id: number;
  persona: string;
  role: string;
  initials: string;
  quote: string;
  context: string;
  isSample: boolean;
};

// These are fictional examples.
// They are NOT real Talzentra customer reviews.

export const testimonials: Testimonial[] = [
  {
    id: 1,
    persona: "Job Seeker",
    role: "Sample Job Seeker Persona",
    initials: "JS",
    quote:
      "I want to discover opportunities that match my skills, understand job requirements, and track my applications in one place.",
    context: "Exploring career opportunities",
    isSample: true,
  },
  {
    id: 2,
    persona: "Recruiter",
    role: "Sample Recruiter Persona",
    initials: "RC",
    quote:
      "A simple platform to post vacancies, review applications, and manage hiring stages would make recruitment easier to organize.",
    context: "Managing recruitment",
    isSample: true,
  },
  {
    id: 3,
    persona: "Career Changer",
    role: "Sample Professional Persona",
    initials: "CC",
    quote:
      "Clear company information and useful job filters could help me compare different opportunities and plan my next career move.",
    context: "Planning a career transition",
    isSample: true,
  },
];
