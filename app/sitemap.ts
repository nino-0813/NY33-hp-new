import type { MetadataRoute } from "next";

import { services } from "./service/services";
import { posts } from "./posts/posts";
import { works } from "./works/works";
import { approaches } from "./approach/approach";

const BASE = "https://ny33.jp";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/service`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/approach`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/works`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/news`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.9 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 }
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

  const workPages: MetadataRoute.Sitemap = works.map((w) => ({
    url: `${BASE}/works/${w.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7
  }));

  const approachPages: MetadataRoute.Sitemap = approaches.map((a) => ({
    url: `${BASE}/approach/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75
  }));

  return [...staticPages, ...servicePages, ...postPages, ...workPages, ...approachPages];
}
