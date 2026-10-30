import { Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/content";

export function Contact() {
  return (
    <section id="contact" className="bg-background py-20 md:py-32">
      <div className="container-page">
        <div className="grid gap-12 lg:gap-16 lg:grid-cols-2 items-start">
          <Reveal className="space-y-6" delay={0}>
            <h2 className="type-h2 text-foreground">
              Let&rsquo;s talk about your project
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Tell us what you need. We&rsquo;ll reply with a free quote.
            </p>

            <div className="mt-8 space-y-4 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <Mail className="size-5 shrink-0 text-accent-highlight" aria-hidden="true" />
                <div>
                  <div className="text-foreground font-medium">Email</div>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="hover:text-foreground transition-colors"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="size-5 shrink-0 text-accent-highlight" aria-hidden="true" />
                <div>
                  <div className="text-foreground font-medium">Location</div>
                  <p>{siteConfig.locations.join(" · ")}</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
