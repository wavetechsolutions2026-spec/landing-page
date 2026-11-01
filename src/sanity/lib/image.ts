import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

// Builds a CDN URL for a Sanity image, respecting its hotspot and crop.
export const urlFor = (source: SanityImageSource) => builder.image(source).auto("format");
