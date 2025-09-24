import NextAuth from "next-auth";
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    sessid: string;
    sessionName: string;
    csrfToken: string;
    user: {
      /** The user's postal address. */
      id: string;
      role: any;
      name: string;
      lastName: string;
      email: string;
    } & DefaultSession;
  }

  interface User extends DefaultUser {
    id: string;
    lastName: string;
    role: any;
    user: {
      uid: string;
      mail: string;
      name: string;
      roles: {
        [key: string]: string;
      };
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: any;
    mail: string;
    name: string;
    lastName: string;
  }
}
