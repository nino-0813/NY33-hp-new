import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://ny33.jp/",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1
    }
  ];
}
