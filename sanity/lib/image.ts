// Sanity image utilities removed. Use `src/lib/imageBuilder.ts` instead.
export const urlFor = (source: any) => {
  // If callers still call this helper, return an empty string as placeholder.
  if (!source) return ''
  if (typeof source === 'string') return source
  try {
    // attempt to use src property or asset path if provided
    // e.g., { _ref: 'image-xxx' } or { asset: { _ref: 'image-xxx' } }
    const maybe = (source.asset && source.asset._ref) || source._ref || source.path || ''
    return typeof maybe === 'string' ? maybe : ''
  } catch {
    return ''
  }
}
