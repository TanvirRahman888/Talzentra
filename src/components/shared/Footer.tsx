export default function Footer() {
  return (
    <footer className="border-t bg-background py-8">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <h2 className="text-xl font-bold text-primary">
          Talzentra
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Connecting Talent. Creating Futures.
        </p>

        <p className="mt-4 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Talzentra.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}