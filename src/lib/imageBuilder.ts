export function urlFor(path: string, options?: { width?: number; height?: number }): string {
  if (!path) return "";

  // If already a full URL, return it (optionally append query params)
  const isAbsolute = /^https?:\/\//i.test(path);
  const params: string[] = [];
  if (options?.width) params.push(`w=${encodeURIComponent(String(options.width))}`);
  if (options?.height) params.push(`h=${encodeURIComponent(String(options.height))}`);

  if (isAbsolute) {
    if (params.length === 0) return path;
    return path + (path.includes("?") ? "&" : "?") + params.join("&");
  }

  // Treat as local public path. Ensure leading slash.
  let p = path.startsWith("/") ? path : `/${path}`;
  if (params.length) {
    p = p + (p.includes("?") ? "&" : "?") + params.join("&");
  }
  return p;
}

export default urlFor;
