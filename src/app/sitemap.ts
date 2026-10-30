import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://wavetechsolution.example.com",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
