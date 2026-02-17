// next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import { DrupalField } from "@/auth.config"; // 👈 Importar la interfaz

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Record<string, string>;
      name: string;
      email: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    lastName: string;
    role: Record<string, string>;
    field_user_perfildeodi: DrupalField; // 👈 Usa la misma interfaz
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: Record<string, string>;
    name: string;
    field_user_perfildeodi: string; // 👈 En el JWT ya es solo el target_id (string)
    sessid: string;
    sessionName: string;
    csrfToken: string;
  }
}