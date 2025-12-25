import { apiVersion, dataset, projectId } from '../env'

// Dynamically require `next-sanity` so the Next.js build doesn't fail
// if the package isn't installed in this environment.
let client: any = null
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { createClient } = require('next-sanity')
  client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
  })
} catch {
  // Fallback: export null client during build; runtime code should handle missing client.
  client = null
}

export { client }
