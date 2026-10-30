"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { navLinks } from "@/lib/content";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Sheet>
      <header
        className={cn(
          "sticky top-0 z-40 border-b bg-background/90 backdrop-blur-sm transition-colors",
          scrolled ? "border-border" : "border-transparent",
        )}
      >
        <div className="container-page flex h-(--header-height) items-center justify-between">
          <Logo className="text-xl" />

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-foreground hover:text-accent-highlight transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button asChild className="hidden md:inline-flex">
              <Link href="#contact">Get a quote</Link>
            </Button>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label="Open menu"
                className="md:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
          </div>
        </div>
      </header>

      <SheetContent side="right" className="sm:max-w-md p-6">
        <SheetHeader className="mb-6 text-left">
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>
            Navigate to a section
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-1">
          {navLinks.map((link) => (
            <SheetClose key={link.label} asChild>
              <Button
                asChild
                variant="ghost"
                className="w-full justify-start text-base font-medium"
              >
                <Link href={link.href}>{link.label}</Link>
              </Button>
            </SheetClose>
          ))}
        </div>
        <SheetClose asChild>
          <Button asChild className="w-full mt-6">
            <Link href="#contact">Get a quote</Link>
          </Button>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}
