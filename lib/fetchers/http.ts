export async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, { ...options, headers: { "Content-Type": "application/json" } })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}
