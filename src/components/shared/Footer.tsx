import Link from "next/link";

import { ArrowUpRight, BriefcaseBusiness } from "lucide-react";

import { FaGithub, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa6";

import type { IconType } from "react-icons";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Footer navigation groups.
const footerGroups = [
  {
    title: "Job Seekers",
    links: [
      { label: "Find Jobs", href: "/jobs" },
      {
        label: "Featured Jobs",
        href: "/jobs?featured=true",
      },
      {
        label: "Browse Companies",
        href: "/companies",
      },
      {
        label: "Create Account",
        href: "/sign-up?role=seeker",
      },
    ],
  },
  {
    title: "Recruiters",
    links: [
      {
        label: "Get Started",
        href: "/sign-up?role=recruiter",
      },
      {
        label: "Recruitment Process",
        href: "/#how-it-works",
      },
      {
        label: "Company Profiles",
        href: "/companies",
      },
    ],
  },
  {
    title: "Resources",
    links: [
      {
        label: "How It Works",
        href: "/#how-it-works",
      },
      { label: "FAQs", href: "/#faq" },
      { label: "Home", href: "/" },
    ],
  },
];

// Social media link configuration.
type SocialLink = {
  label: string;
  href: string;
  icon: IconType;
};

// Only allow valid HTTPS URLs.
function isHttpsUrl(value: string) {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}


const socialLinks: SocialLink[] = [
  {
    label: "LinkedIn",
    href:
      process.env.NEXT_PUBLIC_TALZENTRA_LINKEDIN_URL ?? "",
    icon: FaLinkedin,
  },
  {
    label: "Facebook",
    href:
      process.env.NEXT_PUBLIC_TALZENTRA_FACEBOOK_URL ?? "",
    icon: FaFacebook,
  },
  {
    label: "Instagram",
    href:
      process.env.NEXT_PUBLIC_TALZENTRA_INSTAGRAM_URL ?? "",
    icon: FaInstagram,
  },
  {
    label: "GitHub",
    href:
      process.env.NEXT_PUBLIC_TALZENTRA_GITHUB_URL ?? "",
    icon: FaGithub,
  },
];


export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-12">
          {/* Brand Column */}
          <div className="space-y-6 sm:col-span-2 lg:col-span-2">
            {/* Logo */}
            <Link
              href="/"
              aria-label="Talzentra Home"
              className="inline-flex items-center gap-3"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-indigo-600 text-white">
                <BriefcaseBusiness className="size-6" />
              </span>

              <span className="text-2xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">
                Talzentra
              </span>
            </Link>

            {/* Tagline and Description */}
            <div className="max-w-sm space-y-3">
              <p className="text-base font-semibold text-foreground">
                Connecting Talent. Creating Futures.
              </p>

              <p className="text-sm leading-7 text-muted-foreground">
                Talzentra is a recruitment platform being built to help job
                seekers discover career opportunities and employers connect with
                talent.
              </p>
            </div>

            {/* CTA */}
            <Button asChild variant="outline" className="group">
              <Link href="/jobs">
                Explore Jobs
                <ArrowUpRight className="ml-2 size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </Button>

            {/* Social Media */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">
                Connect With Us
              </h3>

              {socialLinks.length > 0 ? (
                <div className="flex flex-wrap items-center gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;

                    return (
                      <Button
                        key={social.label}
                        asChild
                        variant="outline"
                        size="icon"
                        className="rounded-full"
                      >
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Talzentra on ${social.label}`}
                        >
                          <Icon className="size-4" />
                        </a>
                      </Button>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Official social profiles will appear here when available.
                </p>
              )}
            </div>
          </div>

          {/* Navigation Columns */}
          {footerGroups.map((group) => (
            <nav
              key={group.title}
              aria-label={`${group.title} footer navigation`}
              className="space-y-5"
            >
              <h3 className="text-sm font-semibold text-foreground">
                {group.title}
              </h3>

              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-block text-sm leading-6 text-muted-foreground transition-colors hover:text-indigo-600 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring dark:hover:text-indigo-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Footer Divider */}
        <Separator className="my-10" />

        {/* Footer Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Talzentra. All rights reserved.
          </p>

          {/* Project Status */}
          <p className="text-xs leading-6 text-muted-foreground">
            Currently in development — job listings and companies use sample
            data.
          </p>
        </div>
      </div>
    </footer>
  );
}
