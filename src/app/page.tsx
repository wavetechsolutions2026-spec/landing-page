import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Suspense } from "react";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { WhyUs } from "@/components/sections/why-us";
import { Process } from "@/components/sections/process";
import { Team } from "@/components/sections/team";
import { FAQ } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="flex flex-col min-h-svh">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <SiteHeader />

      <main id="content" className="flex-1">
        <Hero />
        <Services />
        <WhyUs />
        <Process />
        <Team />
        <FAQ />
        <Contact />
      </main>

      <Suspense fallback={<footer className="border-t border-border/40 bg-surface p-6">&nbsp;</footer>}>
        <SiteFooter />
      </Suspense>
    </div>
  );
}
