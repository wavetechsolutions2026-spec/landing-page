"use client";

import Link from "next/link";
import { Logo } from "@/components/logo";
import { navLinks, services, siteConfig } from "@/lib/content";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="theme-dark bg-background text-foreground">
      <div className="container-page pt-14 pb-8 md:pt-20 md:pb-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))]">
          <div className="flex flex-col items-start gap-3">
            <Logo className="text-xl" />
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              {siteConfig.tagline}
            </p>
          </div>

          <FooterColumn title="Services">
            {services.map((service) => (
              <FooterLink key={service.id} href="#services">
                {service.title}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Company">
            {navLinks.map((link) => (
              <FooterLink key={link.label} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Contact">
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex min-h-11 items-center break-all text-muted-foreground hover:text-foreground transition-colors md:min-h-0"
              >
                {siteConfig.email}
              </a>
            </li>
            {siteConfig.locations.map((location) => (
              <li key={location} className="text-muted-foreground">
                {location}
              </li>
            ))}
          </FooterColumn>
        </div>

        <div className="mt-12 border-t pt-6 text-xs text-muted-foreground">
          © {year} Wave Tech Solution. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      <ul className="mt-4 space-y-1 text-sm md:space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="inline-flex min-h-11 items-center text-muted-foreground hover:text-foreground transition-colors md:min-h-0"
      >
        {children}
      </Link>
    </li>
  );
}
