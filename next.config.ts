import type { NextConfig } from "next";
let webpack: any;
try {
  webpack = require("webpack");
} catch {
  webpack = { IgnorePlugin: class {} };
}

const experimental: Record<string, any> = {
  optimizePackageImports: ["lucide-react", "lodash-es"],
};
if (process.env.NEXT_ENABLE_URL_IMPORTS === "1") {
  experimental.urlImports = ["https://"];
}
experimental.turbo = false;

const nextConfig: NextConfig = {
  reactCompiler: true,
  reactStrictMode: true,
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
  webpack: (config, { isServer }) => {
    config.plugins.push(
      new webpack.IgnorePlugin({ resourceRegExp: /^\.\/locale$/, contextRegExp: /moment$/ })
    );
    config.experiments = { ...(config.experiments || {}), topLevelAwait: true };
    if (!isServer) {
      config.optimization = config.optimization || {};
      try {
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
