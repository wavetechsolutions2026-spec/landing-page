"use client";

// Sanity Studio, embedded in the app at /studio.
// Studio code lives in src/sanity; this file stays at the root so the
// Sanity CLI can find it.

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

export default defineConfig({
  basePath: "/studio",
  title: "Wave Tech Solution",
  projectId,
  dataset,
  // Google login only; GitHub and email/password are hidden.
  auth: {
    providers: (providers) => providers.filter((provider) => provider.name === "google"),
  },
  schema: { types: schemaTypes },
  plugins: [
    structureTool({ structure }),
    // GROQ query playground.
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
