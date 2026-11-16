
import Link from "next/link";

import {
  ArrowRight,
  Building2,
  CircleHelp,
  Search,
  UserRound,
  type LucideIcon,
} from "lucide-react";

import {
  seekerFaqs,
  recruiterFaqs,
  type FAQItem,
} from "@/data/faqs";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Props for a reusable FAQ group.
type FAQGroupProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  items: FAQItem[];
  groupId: string;
};

// Reusable FAQ group.
function FAQGroup({
  title,
  description,
  icon: Icon,
  items,
  groupId,
}: FAQGroupProps) {
  return (
    <Card className="h-full gap-5 border-border/70 bg-card">

      {/* Group Heading */}
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex size-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <Icon className="size-6" />
          </div>

          <Badge variant="secondary">
            {items.length} Questions
          </Badge>
        </div>

        <div className="space-y-2">
          <CardTitle className="text-xl sm:text-2xl">
            {title}
          </CardTitle>

          <p className="text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>
      </CardHeader>

      {/* Accordion Questions */}
      <CardContent>
        <Accordion
          type="single"
          collapsible
          className="w-full"
        >
          {items.map((item, index) => (
            <AccordionItem
              key={item.question}
              value={`${groupId}-${index}`}
              className="border-border"
            >
              <AccordionTrigger className="py-5 text-left text-sm font-medium leading-6 text-foreground hover:no-underline hover:text-indigo-600 dark:hover:text-indigo-400 sm:text-base">
                {item.question}
              </AccordionTrigger>

              <AccordionContent className="pb-5 text-sm leading-7 text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}

export default function FAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="scroll-mt-24 bg-background px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center">

          <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <CircleHelp className="size-4" />
            Help & Information
          </p>

          <h2
            id="faq-heading"
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Frequently Asked{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              Questions
            </span>
          </h2>

          <p className="mt-4 leading-7 text-muted-foreground">
            Find answers to common questions about
            Talzentra, job searching, and recruitment.
          </p>
        </div>

        {/* Two FAQ Groups */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-8">

          <FAQGroup
            title="For Job Seekers"
            description="Everything you need to know about finding opportunities and managing your career."
            icon={UserRound}
            items={seekerFaqs}
            groupId="seeker"
          />

          <FAQGroup
            title="For Recruiters"
            description="Learn how Talzentra is designed to support employers and simplify recruitment."
            icon={Building2}
            items={recruiterFaqs}
            groupId="recruiter"
          />

        </div>

        {/* Bottom CTA */}
        <div className="mt-12 rounded-2xl border border-border bg-muted/40 p-6 text-center sm:p-10">

          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <Search className="size-6" />
          </div>

          <h3 className="text-xl font-semibold text-foreground sm:text-2xl">
            Ready to Explore Talzentra?
          </h3>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
            Explore the current job listings and company
            profiles while we continue developing the
            complete recruitment platform.
          </p>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">

            <Button
              asChild
              size="lg"
              className="w-full bg-indigo-600 text-white hover:bg-indigo-700 sm:w-auto"
            >
              <Link href="/jobs">
                Explore Jobs
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
            >
              <Link href="/companies">
                Explore Companies
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}
