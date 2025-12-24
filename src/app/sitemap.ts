import { NextResponse } from "next/server";

type SitemapEntry = { path: string; lastModified: Date; changeFrequency: string; priority: number };

const ENTRIES: SitemapEntry[] = [
  { path: "/", lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
  { path: "/dashboard", lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
  { path: "/rpc", lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
];

function formatUrl(e: SitemapEntry) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  return [
    '<url>',
    `  <loc>${new URL(e.path, base).toString()}</loc>`,
    `  <lastmod>${e.lastModified.toISOString()}</lastmod>`,
    `  <changefreq>${e.changeFrequency}</changefreq>`,
    `  <priority>${e.priority.toFixed(1)}</priority>`,
    '</url>'
  ].join("\n");
}

export async function GET() {
  const urls = ENTRIES.map(formatUrl).join("\n");
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    '</urlset>'
  ].join("\n");
  return new NextResponse(xml, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}


export default GET;
