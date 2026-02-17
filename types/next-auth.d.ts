// next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import { DrupalField } from "@/auth.config";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Record<string, string>;
      name: string;
      lastName: string;
      email: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    lastName: string;
    role: Record<string, string>;
    field_user_perfildeodi: DrupalField;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: Record<string, string>;
    name: string;
    field_user_perfildeodi: string;
    sessid: string;
    sessionName: string;
    csrfToken: string;
  }
}