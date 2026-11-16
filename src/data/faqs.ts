
export type FAQItem = {
  question: string;
  answer: string;
};

// Job Seeker FAQs
export const seekerFaqs: FAQItem[] = [
  {
    question: "How can I find jobs on Talzentra?",
    answer:
      "Visit the Find Jobs page to browse opportunities. You can search by job title, company, or skill and use filters such as location, category, employment type, and work mode. Current listings are demonstration data.",
  },
  {
    question: "Is searching and applying for jobs free?",
    answer:
      "Talzentra is designed to offer free job searching and applications. Searching the demo is currently free, while actual application submissions will be available after the account and backend systems are implemented.",
  },
  {
    question: "Can I apply for a job right now?",
    answer:
      "Not yet. The Apply Now button currently opens a demonstration application form. Actual application submission and resume uploads will become available after authentication and backend integration.",
  },
  {
    question: "Will I be able to save jobs?",
    answer:
      "Yes, saved jobs are part of Talzentra's planned Job Seeker dashboard. Once implemented, registered job seekers will be able to bookmark opportunities and revisit them later.",
  },
  {
    question: "How will I track my job applications?",
    answer:
      "The planned Job Seeker dashboard will display application statuses such as Applied, In Review, Shortlisted, Interview, Offered, and Hired. Application tracking is not available in the current demo.",
  },
];

// Recruiter FAQs
export const recruiterFaqs: FAQItem[] = [
  {
    question: "How can I register as a recruiter?",
    answer:
      "Talzentra will support dedicated recruiter registration. Recruiters will be able to create an account and manage a company profile. Registration is currently under development.",
  },
  {
    question: "How do I post a job on Talzentra?",
    answer:
      "In the planned Recruiter dashboard, employers will create job drafts, provide vacancy details, and submit listings for administrative approval before publication.",
  },
  {
    question: "Can I review job applications?",
    answer:
      "Recruiters will be able to review applicants for jobs belonging to their authorized company, inspect application details, and update recruitment statuses. These tools will be added during backend development.",
  },
  {
    question: "Does Talzentra verify companies?",
    answer:
      "Company verification and administrative moderation are part of the planned platform. The current sample companies are fictional and have not undergone any verification process.",
  },
  {
    question: "Will Talzentra offer Premium memberships?",
    answer:
      "Yes, Premium memberships are planned for Job Seekers and Recruiters, with additional features and configurable subscription plans. Pricing, payment processing, and Premium access are not active yet.",
  },
];
