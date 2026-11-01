import { Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/content";

export function Contact() {
  return (
    <section id="contact" className="section-y bg-background">
      <div className="container-page">
        <div className="grid items-start gap-10 rounded-3xl bg-primary p-6 text-primary-foreground sm:p-10 lg:grid-cols-2 lg:gap-16 lg:p-14">
          <Reveal className="space-y-6" delay={0}>
            <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-sm font-medium">
              Contact
            </span>
            <h2 className="type-h2">
              Let&rsquo;s talk about your project
            </h2>
            <p className="text-lg text-primary-foreground/85 leading-relaxed">
              Tell us what you need. We&rsquo;ll reply with a free quote.
            </p>

            <div className="space-y-5 pt-4 text-sm">
              <div className="flex items-start gap-3">
                <Mail className="size-5 shrink-0" aria-hidden="true" />
                <div>
                  <div className="font-medium">Email</div>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-primary-foreground/85 underline-offset-4 hover:text-primary-foreground hover:underline"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="size-5 shrink-0" aria-hidden="true" />
                <div>
                  <div className="font-medium">Location</div>
                  <p className="text-primary-foreground/85">{siteConfig.locations.join(" · ")}</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="rounded-2xl bg-background p-6 text-foreground shadow-lg sm:p-8" delay={0.08}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
