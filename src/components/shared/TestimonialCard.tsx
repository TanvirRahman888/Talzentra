
import { Quote } from "lucide-react";

import type { Testimonial } from "@/data/testimonials";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export default function TestimonialCard({
  testimonial,
}: TestimonialCardProps) {
  return (
    <Card className="group flex h-full flex-col gap-0 border-border/70 bg-card py-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/5">

      {/* Card Header */}
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex size-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <Quote className="size-6" />
          </div>

          {testimonial.isSample && (
            <Badge
              variant="outline"
              className="text-xs text-muted-foreground"
            >
              Sample Testimonial
            </Badge>
          )}
        </div>
      </CardHeader>

      {/* Quote */}
      <CardContent className="flex flex-1 flex-col pt-6">
        <blockquote className="flex-1 text-base leading-8 text-foreground">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>

        <p className="mt-5 text-xs text-muted-foreground">
          {testimonial.context}
        </p>
      </CardContent>

      {/* Persona Information */}
      <CardFooter className="mt-6 border-t border-border pt-5">
        <div className="flex items-center gap-3">

          {/* Avatar */}
          <Avatar className="size-11">
            <AvatarFallback className="bg-indigo-500/10 font-semibold text-indigo-600 dark:text-indigo-400">
              {testimonial.initials}
            </AvatarFallback>
          </Avatar>

          {/* Persona */}
          <div>
            <p className="text-sm font-semibold text-foreground">
              {testimonial.persona}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              {testimonial.role}
            </p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
