import { getSession } from "next-auth/react";

export async function drupalFetch<T = any>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const session = await getSession();

  if (!session) throw new Error("No hay sesión activa");

  const { sessid, sessionName, csrfToken } = session as any;

  const res = await fetch(`${process.env.NEXT_PUBLIC_DRUPAL_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken,
      Cookie: `${sessionName}=${sessid}`,
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    throw new Error(`Drupal error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
