import fs from 'fs/promises'
import path from 'path'

export async function getContent<T>(filePath: string): Promise<T> {
  const base = path.join(process.cwd(), 'src', 'content')
  const full = path.join(base, filePath)

  try {
    const raw = await fs.readFile(full, 'utf-8')
    return JSON.parse(raw) as T
  } catch (err: unknown) {
    const e = err as Error
    if ((e as NodeJS.ErrnoException).code === 'ENOENT') {
      throw new Error(`Content file not found: ${filePath} (looked in src/content)`)
    }
    throw new Error(`Failed to load content file ${filePath}: ${e.message}`)
  }
}

export default getContent
