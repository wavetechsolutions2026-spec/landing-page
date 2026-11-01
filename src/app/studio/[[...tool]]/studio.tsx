"use client";

import dynamic from "next/dynamic";

// Loaded in the browser only. Server-rendering the Studio would bundle all of
// Sanity into the Cloudflare Worker (about 6 MB gzipped) for no benefit,
// since the Studio is a client-side app.
export const Studio = dynamic(() => import("./studio-app"), { ssr: false });
