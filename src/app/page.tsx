import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Suspense } from "react";
import { connection } from "next/server";
import { getLandingContent } from "@/sanity/lib/landing";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { ServiceBand } from "@/components/sections/service-band";
import { Services } from "@/components/sections/services";
import { WhyUs } from "@/components/sections/why-us";
import { Process } from "@/components/sections/process";
import { Team } from "@/components/sections/team";
import { Work } from "@/components/sections/work";
import { FAQ } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";

export default async function Home() {
  // Render on each request so edits published in Sanity show up right away,
  // without a redeploy. Sanity's CDN keeps these reads fast.
  await connection();
  const { techStack, services, faqs, team, projects } = await getLandingContent();

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
        <Hero team={team} techStack={techStack} />
        <About team={team} />
        <ServiceBand services={services} />
        <Services services={services} />
        <WhyUs />
        <Team team={team} />
        <Work projects={projects} team={team} />
        <Process />
        <FAQ faqs={faqs} />
        <Contact />
      </main>

      <Suspense fallback={<footer className="theme-dark bg-background p-6">&nbsp;</footer>}>
        <SiteFooter services={services} />
      </Suspense>
    </div>
  );
}
