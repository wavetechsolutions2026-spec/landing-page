import type { SanityImageSource } from "@sanity/image-url";
import { client } from "./client";
import { urlFor } from "./image";
import { LANDING_QUERY } from "./queries";
import * as fallback from "@/lib/content";
import type { FAQItem, Project, Service, TeamMember } from "@/lib/content";

export type LandingContent = {
  services: Service[];
  faqs: FAQItem[];
  team: TeamMember[];
  projects: Project[];
};

type SanityImage = (SanityImageSource & { asset?: unknown; alt?: string }) | null;

type RawLanding = {
  services: Service[];
  faqs: FAQItem[];
  team: (Omit<TeamMember, "photo" | "portrait"> & { id: string; photo: SanityImage })[];
  projects: (Omit<Project, "image"> & { image: SanityImage })[];
};

const hasAsset = (image: SanityImage): image is SanityImageSource & { alt?: string } =>
  Boolean(image && image.asset);

// Fetches the landing page content published in Sanity. Falls back to the
// copy in src/lib/content.ts if Sanity cannot be reached, so the page still
// renders.
export async function getLandingContent(): Promise<LandingContent> {
  try {
    const data = await client.fetch<RawLanding>(LANDING_QUERY, {}, { cache: "no-store" });

    return {
      services: data.services,
      faqs: data.faqs,
      team: data.team.map(({ photo, ...member }) => ({
        ...member,
        // Small round avatar and the 4:3 team card photo, both cropped around the hotspot.
        photo: hasAsset(photo) ? urlFor(photo).width(192).height(192).fit("crop").url() : undefined,
        portrait: hasAsset(photo) ? urlFor(photo).width(1200).height(900).fit("crop").url() : undefined,
        photoAlt: hasAsset(photo) ? photo.alt : undefined,
      })),
      projects: data.projects.map(({ image, ...project }) => ({
        ...project,
        image: hasAsset(image) ? urlFor(image).width(1200).height(750).fit("crop").url() : undefined,
      })),
    };
  } catch (error) {
    console.error("[sanity] Failed to load landing content, using fallback copy.", error);
    return {
      services: fallback.services,
      faqs: fallback.faqs,
      team: fallback.team,
      projects: fallback.projects,
    };
  }
}
