/** Resolve a file under `public/` for both local dev and GitHub Pages subpaths. */
export function publicAsset(path: string): string {
  const normalized = path.replace(/^\//, '')
  const base = import.meta.env.BASE_URL
  return `${base}${normalized}`
}
