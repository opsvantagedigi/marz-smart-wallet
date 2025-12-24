import nextConfig from "./next.config";
import { withMDX } from "@next/mdx";

const mdxConfig = withMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    providerImportSource: "@mdx-js/react",
  },
});

export default mdxConfig({
  ...nextConfig,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
});
