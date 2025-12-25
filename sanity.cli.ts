/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
// The Sanity CLI dependency isn't required for the Next.js production build.
// Export a minimal config object so the build doesn't fail if `sanity/cli` is not installed.
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

const cliConfig = { api: { projectId, dataset } }

export default cliConfig as unknown as Record<string, unknown>
