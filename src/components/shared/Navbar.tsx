
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, BriefcaseBusiness, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import ModeToggle from "@/components/shared/ModeToggle";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Find Jobs", href: "/jobs" },
  { label: "Companies", href: "/companies" },
  { label: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return (
      pathname === href ||
      (href !== "/" && pathname.startsWith(`${href}/`))
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5"
          aria-label="Talzentra Home"
        >
          <div className="flex size-9 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <BriefcaseBusiness className="size-5" />
          </div>

          <span className="text-xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">
            Talzentra
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 md:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={
                isActive(link.href) ? "page" : undefined
              }
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">

          {/* One-click Light/Dark Toggle */}
          <ModeToggle />

          {/* Desktop Auth Buttons */}
          <div className="hidden items-center gap-2 md:flex">
            <Button variant="ghost" asChild>
              <Link href="/sign-in">
                Sign In
              </Link>
            </Button>

            <Button
              asChild
              className="bg-indigo-600 text-white hover:bg-indigo-700"
            >
              <Link href="/sign-up">
                Get Started
                <ArrowUpRight className="ml-1 size-4" />
              </Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Open navigation menu"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-[85vw] max-w-sm"
              >
                <SheetHeader>
                  <SheetTitle className="text-left text-xl font-bold text-indigo-600 dark:text-indigo-400">
                    Talzentra
                  </SheetTitle>

                  <SheetDescription className="text-left">
                    Connecting Talent. Creating Futures.
                  </SheetDescription>
                </SheetHeader>

                {/* Mobile Links */}
                <nav
                  aria-label="Mobile navigation"
                  className="flex flex-col gap-2 px-4"
                >
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={
                          isActive(link.href)
                            ? "page"
                            : undefined
                        }
                        className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                          isActive(link.href)
                            ? "bg-accent text-foreground"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>

                {/* Mobile Authentication */}
                <div className="mt-auto grid gap-3 border-t border-border p-4">
                  <SheetClose asChild>
                    <Link
                      href="/sign-in"
                      className="flex h-10 items-center justify-center rounded-md border border-input text-sm font-medium hover:bg-accent"
                    >
                      Sign In
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link
                      href="/sign-up"
                      className="flex h-10 items-center justify-center rounded-md bg-indigo-600 text-sm font-medium text-white hover:bg-indigo-700"
                    >
                      Create Account
                    </Link>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
