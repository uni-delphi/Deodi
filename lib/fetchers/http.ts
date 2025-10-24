export async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  console.log("🚀 ~ fetchJson ~ options:", options)
  
  const res = await fetch(url, { ...options, headers: { "Content-Type": "application/json" } });
  //console.log("🚀 ~ fetchJson ~ res:", res)
  
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}
