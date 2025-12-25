import type { MetadataRoute } from "next";

type SitemapEntry = {
  path: string;
  lastModified: Date;
  changeFrequency: string;
  priority: number;
};

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://opsvantagedigital.online";

const ENTRIES: SitemapEntry[] = [
  { path: "/", lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
  { path: "/dashboard", lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
  { path: "/rpc", lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
];

// helper removed: unused in current sitemap generation

export default function sitemap(): MetadataRoute.Sitemap {
  return ENTRIES.map(entry => ({
    url: new URL(entry.path, BASE_URL).toString(),
    lastModified: entry.lastModified.toISOString(),
    changeFrequency: entry.changeFrequency as "daily",
    priority: entry.priority
  }));
}
