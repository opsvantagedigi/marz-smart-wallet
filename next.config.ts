import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React Compiler (Next.js 16)
  reactCompiler: true,

  // Strict mode catches subtle bugs early
  reactStrictMode: true,

  // Production-level security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
        ],
      },
    ];
  },

  // Image optimization for all remote assets
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // Enable URL imports (useful for remote configs, JSON, scripts)
  experimental: {
    urlImports: ["https://"],
    optimizePackageImports: ["lucide-react", "lodash-es"],
    serverActions: {
      allowedOrigins: ["localhost:3000", "*.opsvantagedigital.online"],
    },
  },

  // Enable edge runtime for ultra-fast API routes
  // (Perfect for RPC proxy endpoints)
  experimental: {
    runtime: "edge",
  },

  // Webpack tuning for performance
  webpack: (config, { isServer }) => {
    // Reduce bundle size by ignoring moment.js locales
    config.plugins.push(
      new (require("webpack")).IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      })
    );

    // Enable top-level await
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };

    // Remove console logs in production
    if (!isServer) {
      config.optimization.minimizer = [
        new (require("terser-webpack-plugin"))({
          terserOptions: {
            compress: {
              drop_console: true,
            },
          },
        }),
      ];
    }

    return config;
  },

  // Enable SWC minification (faster builds)
  swcMinify: true,

  // Enable compression for faster responses
  compress: true,
};

export default nextConfig;
