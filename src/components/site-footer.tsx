"use client";

import Link from "next/link";
import { Logo } from "@/components/logo";
import { navLinks, siteConfig } from "@/lib/content";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-surface">
      <div className="container-page pt-10 pb-8 md:pt-16 md:pb-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex flex-col items-start md:text-left gap-3">
            <Logo className="text-xl" />
            <p className="text-sm text-muted-foreground max-w-md">
              {siteConfig.tagline}
            </p>
          </div>

          <nav className="flex flex-col md:flex-row md:gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="inline-flex min-h-11 items-center text-foreground hover:text-accent-highlight transition-colors md:min-h-0"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 md:mt-0 border-t border-border/40 pt-6 text-xs text-muted-foreground">
          © {year} Wave Tech Solution. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
