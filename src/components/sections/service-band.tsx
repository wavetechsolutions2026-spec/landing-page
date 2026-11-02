import { Asterisk } from "lucide-react";
import type { Service } from "@/lib/content";

// Decorative brand strip with the service names scrolling past. The list is
// rendered twice so the loop is seamless; screen readers skip it because the
// services section below names the same things.
export function ServiceBand({ services }: { services: Service[] }) {
  const items = [...services, ...services];

  return (
    <div className="overflow-hidden bg-primary py-4 text-primary-foreground" aria-hidden="true">
      <ul className="flex w-max animate-marquee">
        {items.map((service, index) => (
          <li
            key={`${service.id}-${index}`}
            className="flex items-center gap-6 pr-6 font-display text-lg font-semibold whitespace-nowrap"
          >
            {service.title}
            <Asterisk className="size-5 opacity-70" />
          </li>
        ))}
      </ul>
    </div>
  );
}
