
import Link from "next/link";

import {
  ArrowRight,
  MessageSquareQuote,
} from "lucide-react";

import { testimonials } from "@/data/testimonials";

import TestimonialCard from "@/components/shared/TestimonialCard";
import { Button } from "@/components/ui/button";

export default function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="bg-muted/30 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center">

          {/* Eyebrow */}
          <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <MessageSquareQuote className="size-4" />
            Community Stories
          </p>

          {/* Heading */}
          <h2
            id="testimonials-heading"
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Stories That Inspire{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              Success
            </span>
          </h2>

          {/* Description */}
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Talzentra is being designed for job seekers
            and recruiters. Here is a preview of how
            future community experiences could appear.
          </p>
        </div>

        {/* Sample Disclosure */}
        <div
          role="note"
          className="mx-auto mb-8 max-w-3xl rounded-lg border border-border bg-background px-5 py-4 text-center"
        >
          <p className="text-sm leading-6 text-muted-foreground">
            <strong className="text-foreground">
              Design demonstration:
            </strong>{" "}
            The following quotes are fictional examples,
            not actual customer reviews, endorsements,
            or employment outcomes.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 flex flex-col items-center gap-5 text-center">
          <p className="max-w-xl text-sm leading-7 text-muted-foreground">
            Explore the opportunities and organizations
            currently featured in our Talzentra demo.
          </p>

          <Button
            asChild
            size="lg"
            className="bg-indigo-600 px-8 text-white hover:bg-indigo-700"
          >
            <Link href="/jobs">
              Explore Jobs
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
