import type { MetadataRoute } from "next";

import { services } from "./service/services";
import { posts } from "./posts/posts";

const BASE = "https://ny33.jp";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/service`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/news`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 }
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE}/service/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7
  }));

  const postPages: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE}/${p.category}/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.6
  }));

  return [...staticPages, ...servicePages, ...postPages];
}
