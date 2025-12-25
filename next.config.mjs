
import withMDX from "@next/mdx";

const experimental = {
  optimizePackageImports: ["lucide-react", "lodash-es"],
  turbo: false,
};
if (process.env.NEXT_ENABLE_URL_IMPORTS === "1") {
  experimental.urlImports = ["https://"];
}

const nextConfig = {
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
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  webpack: async (config, { isServer }) => {
    // Dynamic import for webpack and terser-webpack-plugin
    const webpackModule = await import("webpack");
    const IgnorePlugin = webpackModule?.default?.IgnorePlugin || webpackModule.IgnorePlugin;
    config.plugins.push(
      new IgnorePlugin({ resourceRegExp: /^\.\/locale$/, contextRegExp: /moment$/ })
    );
    config.experiments = { ...(config.experiments || {}), topLevelAwait: true };
    if (!isServer) {
      config.optimization = config.optimization || {};
      try {
        const terserModule = await import("terser-webpack-plugin");
        const TerserPlugin = terserModule.default || terserModule;
        config.optimization.minimizer = [new TerserPlugin({ terserOptions: { compress: { drop_console: true } } })];
      } catch {
        config.optimization.minimize = true;
      }
    }
    return config;
  },
};

export default withMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    providerImportSource: "@mdx-js/react",
  },
})(nextConfig);
