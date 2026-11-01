// Public Sanity settings, safe to bundle for the browser. Secrets (read
// tokens) must never be added here: keep them in server-only modules.
//
// NEXT_PUBLIC_ values are inlined at build time. The project ID and dataset
// are public, so they default to the wave-landing project; this keeps
// Cloudflare builds working without extra build variables.

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "8o8c9vqq";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// Pinned API version; bump deliberately after checking the changelog.
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-11-01";
