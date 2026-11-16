
"use client";

import { ArrowUpRight, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ApplyJobDialogProps = {
  title: string;
  company: string;
  disabled?: boolean;
  className?: string;
};

export default function ApplyJobDialog({
  title,
  company,
  disabled = false,
  className = "",
}: ApplyJobDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          disabled={disabled}
          className={`bg-indigo-600 text-white hover:bg-indigo-700 ${className}`}
        >
          {disabled ? "Applications Closed" : "Apply Now"}
          {!disabled && <ArrowUpRight className="ml-2 size-4" />}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Apply for {title}
          </DialogTitle>

          <DialogDescription>
            {company} — Application form preview.
            Submission is not available yet.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(event) => event.preventDefault()}
          className="space-y-5"
        >
          <div className="space-y-2">
            <Label htmlFor="applicant-name">
              Full Name
            </Label>
            <Input
              id="applicant-name"
              autoComplete="name"
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="applicant-email">
              Email Address
            </Label>
            <Input
              id="applicant-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="applicant-phone">
              Phone Number
            </Label>
            <Input
              id="applicant-phone"
              type="tel"
              autoComplete="tel"
              placeholder="Enter your phone number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="applicant-resume">
              Resume
            </Label>

            <Input
              id="applicant-resume"
              type="file"
              accept=".pdf,.doc,.docx"
            />

            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <FileText className="size-4" />
              PDF, DOC, or DOCX. File is not uploaded.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="applicant-cover-letter">
              Cover Letter
            </Label>

            <Textarea
              id="applicant-cover-letter"
              placeholder="Tell the employer why you're a good fit..."
              rows={5}
            />
          </div>

          <p className="rounded-lg bg-muted p-3 text-xs leading-5 text-muted-foreground">
            Demo only. This form does not send or save
            information. Use test data while exploring it.
          </p>

          <DialogFooter>
            <Button
              type="submit"
              className="w-full"
              disabled
            >
              Submit Application — Coming Soon
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
