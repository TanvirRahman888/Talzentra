
import Link from "next/link";
import ModeToggle from "@/components/shared/ModeToggle";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Find Jobs", href: "/jobs" },
  { label: "Companies", href: "/companies" },
  { label: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  return (
    <header className="border-b border-border bg-background text-foreground">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5">
        <Link
          href="/"
          className="text-2xl font-bold text-indigo-600"
        >
          Talzentra
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-bold text-foreground hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>

<div className="flex items-center gap-3">
  <ModeToggle />

  <Link
    href="/sign-in"
    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
  >
    Sign In
  </Link>
</div>

      </nav>
    </header>
  );
}
