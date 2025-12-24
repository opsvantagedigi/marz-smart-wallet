#!/usr/bin/env bash
# safer scaffold: creates directories and writes files, reports errors but continues
set -u

write_file() {
  local path="$1"; shift
  mkdir -p "$(dirname "$path")"
  cat > "$path" || { echo "ERROR: failed to write $path" >&2; return 1; }
  echo "WROTE: $path"
}

# next.config.ts
write_file next.config.ts <<'EOF'
import type { NextConfig } from "next";

let webpack: any;
try {
  // safe require to avoid TS errors when webpack isn't installed
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  webpack = require("webpack");
} catch {
  webpack = { IgnorePlugin: class {} };
}

const experimental: Record<string, any> = {
  optimizePackageImports: ["lucide-react", "lodash-es"],
  serverActions: {
    allowedOrigins: [
      "localhost:3000",
      "opsvantagedigital.online",
      "www.opsvantagedigital.online",
    ],
  },
};

if (process.env.NEXT_ENABLE_URL_IMPORTS === "1") {
  experimental.urlImports = ["https://"];
}

const nextConfig: NextConfig = {
  reactCompiler: true,
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
        ],
      },
    ];
  },
  experimental,
  turbopack: {},
  webpack: (config, { isServer }) => {
    config.plugins.push(
      new webpack.IgnorePlugin({ resourceRegExp: /^\.\/locale$/, contextRegExp: /moment$/ })
    );
    config.experiments = { ...(config.experiments || {}), topLevelAwait: true };
    if (!isServer) {
      config.optimization = config.optimization || {};
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const TerserPlugin = require("terser-webpack-plugin");
        config.optimization.minimizer = [new TerserPlugin({ terserOptions: { compress: { drop_console: true } } })];
      } catch {
        config.optimization.minimize = true;
      }
    }
    return config;
  },
};

export default nextConfig;
EOF

# middleware.ts
write_file middleware.ts <<'EOF'
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  try {
    const url = req.nextUrl.clone();
    const redirect = url.searchParams.get("redirect");
    if (redirect) {
      const isInternal = typeof redirect === "string" && redirect.startsWith("/") && !redirect.startsWith("//");
      if (!isInternal) {
        url.searchParams.delete("redirect");
        return NextResponse.redirect(url);
      }
    }
  } catch {}
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
EOF

# public/robots.txt
mkdir -p public
write_file public/robots.txt <<'EOF'
User-agent: *
Allow: /

Sitemap: /sitemap.xml
EOF

# src/app/sitemap.ts
mkdir -p src/app
write_file src/app/sitemap.ts <<'EOF'
import { NextResponse } from "next/server";

type SitemapEntry = { path: string; lastModified: Date; changeFrequency: string; priority: number };

const ENTRIES: SitemapEntry[] = [
  { path: "/", lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
  { path: "/dashboard", lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
  { path: "/rpc", lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
];

function formatUrl(e: SitemapEntry) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  return \`
  <url>
    <loc>\${new URL(e.path, base).toString()}</loc>
    <lastmod>\${e.lastModified.toISOString()}</lastmod>
    <changefreq>\${e.changeFrequency}</changefreq>
    <priority>\${e.priority.toFixed(1)}</priority>
  </url>\`;
}

export async function GET() {
  const urls = ENTRIES.map(formatUrl).join("\\n");
  const xml = \`<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  \${urls}
  </urlset>\`;
  return new NextResponse(xml, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}

export const dynamic = "force-static";
EOF

# src/app/api/solana-rpc/route.ts
mkdir -p src/app/api/solana-rpc
write_file src/app/api/solana-rpc/route.ts <<'EOF'
export const runtime = "edge";
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";

const ALLOWED_ORIGINS = new Set([
  "http://localhost:3000",
  "https://opsvantagedigital.online",
  "https://www.opsvantagedigital.online",
]);

function originIsAllowed(o?: string|null){return !!o && ALLOWED_ORIGINS.has(o);}

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (origin && !originIsAllowed(origin)) return new NextResponse(JSON.stringify({error:"Origin not allowed"}), {status:403, headers:{ "Content-Type":"application/json"}});
  const apiKey = req.headers.get("x-marz-api-key");
  if (!apiKey) return new NextResponse(JSON.stringify({error:"Missing API key"}),{status:401, headers:{ "Content-Type":"application/json"}});
  const upstream = process.env.SOLANA_RPC_UPSTREAM;
  if (!upstream) return new NextResponse(JSON.stringify({error:"Upstream not configured"}),{status:500, headers:{ "Content-Type":"application/json"}});
  let payload:any;
  try{ payload = await req.json(); } catch { return new NextResponse(JSON.stringify({error:"Invalid JSON body"}),{status:400, headers:{ "Content-Type":"application/json"}}); }
  try{
    const upstreamRes = await fetch(upstream, { method:"POST", headers: { "Content-Type":"application/json","x-marz-api-key":apiKey }, body: JSON.stringify(payload), cache:"no-store" });
    const bodyText = await upstreamRes.text();
    const contentType = upstreamRes.headers.get("content-type") || "application/json";
    const headers = new Headers({ "Content-Type": contentType, "Cache-Control":"no-store, no-cache, must-revalidate, proxy-revalidate" });
    return new NextResponse(bodyText, { status: upstreamRes.status, headers });
  }catch(err){
    return new NextResponse(JSON.stringify({error:"Upstream fetch failed", detail:String(err)}),{status:502, headers:{ "Content-Type":"application/json"}});
  }
}
EOF

# src/app/api/stats/route.ts
mkdir -p src/app/api/stats
write_file src/app/api/stats/route.ts <<'EOF'
export const runtime = "edge";
export const revalidate = 30;

import { NextResponse } from "next/server";

const PLACEHOLDER = "https://api.example.com/analytics/stats";

export async function GET(){
  try{
    const res = await fetch(PLACEHOLDER, { method: "GET", cache: "force-cache" });
    if(!res.ok) return NextResponse.json({error:"Upstream error", status: res.status}, { status: 502 });
    const data = await res.json();
    return NextResponse.json(data, { status: 200, headers: { "Cache-Control": "public, max-age=30, stale-while-revalidate=60" } });
  }catch(err){
    return NextResponse.json({ error: "Fetch failed", detail: String(err) }, { status: 502 });
  }
}
EOF

# Dockerfile
write_file Dockerfile <<'EOF'
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --production=false
COPY . .
RUN npm run build

# Production image
FROM node:20-alpine AS runner
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm","start"]
EOF

echo "SCaffold finished. If any writes failed you will see ERROR lines above."
