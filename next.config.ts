// next.config.ts
import type { NextConfig } from "next";
let webpack: any;
try {
  // use require to avoid TypeScript compile error when package is not installed
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  webpack = require("webpack");
} catch {
  // provide a minimal fallback so server-side build won't crash when webpack isn't present
  webpack = { IgnorePlugin: class {} };
}
let TerserPlugin: any;
try {
  // use require to avoid TypeScript compile error when package is not installed
  // (Next.js may already handle minification for production builds)
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  TerserPlugin = require("terser-webpack-plugin");
} catch {
  TerserPlugin = undefined;
}

const nextConfig: NextConfig = {
  reactCompiler: true,
  reactStrictMode: true,
  compress: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
          },
          { key: "X-XSS-Protection", value: "1; mode=block" },
        ],
      },
    ];
  },

  experimental: {
    urlImports: ["https://"],
    optimizePackageImports: ["lucide-react", "lodash-es"],
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        "opsvantagedigital.online",
        "www.opsvantagedigital.online",
      ],
    },
  },

  webpack: (config, { isServer }) => {
    // Ignore moment.js locales if ever used (bundle size)
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      })
    );

    // Allow top-level await if needed
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };

    // Strip console.* in client bundles for production
    if (!isServer) {
      config.optimization = config.optimization || {};
      try {
        const TerserPlugin = require("terser-webpack-plugin");
        config.optimization.minimizer = [
          new TerserPlugin({
            terserOptions: {
              compress: { drop_console: true },
            },
          }),
        ];
      } catch (e) {
        // terser-webpack-plugin may not be available in the build environment;
        // fall back to enabling default minimization
        config.optimization.minimize = true;
      }
    }

    return config;
  },
};

export default nextConfig;
