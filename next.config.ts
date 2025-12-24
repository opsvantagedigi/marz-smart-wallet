import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    appDir: true,
  },
};

export default nextConfig;
