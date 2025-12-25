
/* eslint-disable @typescript-eslint/no-require-imports */
import withMDX from "@next/mdx";


const experimental = {
  optimizePackageImports: ["lucide-react", "lodash-es"],
};
if (process.env.NEXT_ENABLE_URL_IMPORTS === "1") {
  experimental.urlImports = ["https://"];
}

const nextConfig = {
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
  webpack: (config, { isServer }) => {
    // Use Next.js's internal webpack if available
    let IgnorePlugin;
    try {
      // Try to use Next.js's compiled webpack
      IgnorePlugin = require('next/dist/compiled/webpack/webpack-lib.js').IgnorePlugin;
    } catch {
      // Fallback to external webpack if not found
      try {
        IgnorePlugin = require('webpack').IgnorePlugin;
      } catch {
        IgnorePlugin = null;
      }
    }
    if (IgnorePlugin) {
      config.plugins.push(
        new IgnorePlugin({ resourceRegExp: /^\.\/locale$/, contextRegExp: /moment$/ })
      );
    }
    config.experiments = { ...(config.experiments || {}), topLevelAwait: true };
    if (!isServer) {
      config.optimization = config.optimization || {};
      try {
        // Use terser-webpack-plugin if available
        const TerserPlugin = require('terser-webpack-plugin');
        config.optimization.minimizer = [new TerserPlugin({ terserOptions: { compress: { drop_console: true } } })];
      } catch {
        config.optimization.minimize = true;
      }
    }
    // Do not override devtool in development
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
