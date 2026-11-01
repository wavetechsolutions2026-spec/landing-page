import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

// Reads published content through the Sanity CDN.
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
