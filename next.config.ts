// next.config.ts
import type { NextConfig } from "next";
import webpack from "webpack";
import TerserPlugin from "terser-webpack-plugin";

const nextConfig: NextConfig = {
  reactCompiler: true,
  reactStrictMode: true,
  swcMinify: true,
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
      config.optimization.minimizer = [
        new TerserPlugin({
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
};

export default nextConfig;
