// Serves Sanity Studio at /studio. Every /studio/* route is handled here by
// the Studio's own client-side router.

import type { Metadata, Viewport } from "next";
import { Studio } from "./studio";

export const dynamic = "force-static";

// Same values as next-sanity/studio's exports, defined here so this server
// file does not import Sanity.
export const metadata: Metadata = {
  title: "Studio — Wave Tech Solution",
  referrer: "same-origin",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function StudioPage() {
  return <Studio />;
}
