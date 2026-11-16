
import Link from "next/link";
import { ArrowLeft, UserRoundPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

type SignUpPageProps = {
  searchParams: Promise<{ role?: string }>;
};

export default async function SignUpPage({
  searchParams,
}: SignUpPageProps) {
  const { role } = await searchParams;

  const isRecruiter = role === "recruiter";

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-background px-4 py-16">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <UserRoundPlus className="size-7" />
          </div>

          <CardTitle className="text-2xl">
            {isRecruiter
              ? "Recruiter Registration"
              : "Job Seeker Registration"}
          </CardTitle>

          <CardDescription>
            Account registration is coming soon
            to Talzentra.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          <p className="text-sm leading-7 text-muted-foreground">
            We are currently building secure
            authentication and role-based accounts.
            Registration is not available yet.
          </p>

          <Button asChild variant="outline">
            <Link href="/">
              <ArrowLeft className="mr-2 size-4" />
              Back to Homepage
            </Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
