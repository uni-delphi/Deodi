import { fetchJson } from "@/lib/fetchers/http";
import { TUser } from "@/types/user";

export async function getUser(data: {
  name: string;
  email: string;
}): Promise<TUser> {
  return fetchJson<TUser>("/api/user", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function createUser(data: {
  name: string;
  email: string;
}): Promise<TUser> {
  return fetchJson<TUser>("/api/users", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function loginUser(credentials: {
  username: string;
  password: string;
}): Promise<TUser> {
  
  return fetchJson<TUser>(`https://apideodi.cloud/app/api/user/login.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "persona@persona.com",//credentials.email,
      password: "123456",//credentials.password,
    }),
  });
}
