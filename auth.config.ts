import { Account, NextAuthOptions, User } from "next-auth";

import bcrypt from "bcrypt";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { loginUser } from "@/lib/services/user/user.services";

// Interfaz extendida para incluir los datos de Drupal
export interface DrupalUserSession extends User {
  sessid: string;
  sessionName: string;
  csrfToken: string;
  role: Record<string, string>;
  field_user_perfildeodi: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) return null;
        try {
          const drupalUser  = await loginUser({
            username: credentials.email,
            password: credentials.password,
          });
          //console.log("🚀 ~ authorize ~ user:", user)

          if (!drupalUser ) return null;
          const user: DrupalUserSession = {
            id: drupalUser.user.uid,
            name: drupalUser.user.name,
            lastName: drupalUser.user.name,
            email: drupalUser.user.mail,
            role: drupalUser.user.roles,
            sessid: drupalUser.sessid,
            sessionName: drupalUser.session_name,
            csrfToken: drupalUser.token,
            field_user_perfildeodi: drupalUser.user.field_user_perfildeodi,
            //user: {
            //  uid: "",
            //  mail: "",
            //  name: "",
            //  field_user_perfildeodi: "",
            //  roles: {}
            //}
          };

          return user;
        } catch {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }: { user: any; account: any }): Promise<any> {      
      if (account.provider === "google") {
        try {
          const { name, email } = user;
          //const createdUser: any = await db.user.findUnique({
          //  where: {
          //    email,
          //  },
          //});
          let createdUser = {
            id: "1",
            name,
            email,
            lastName: "",
            role: "user",
            password: "",
            validatedPassword: "",
          };
          if (!createdUser) {
            return null;
          }

          const { password, validatedPassword, ...props } = createdUser;

          return props;
        } catch (error) {
          console.log("🚀 ~ signIn ~ error:", error);
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      // Solo cuando haya un user (login)
      if (user) {
        const u = user as DrupalUserSession;
        token.id = u.id;
        token.name = u.name ?? "";
        token.email = u.email;
        token.role = u.role;
        token.sessid = u.sessid;
        token.sessionName = u.sessionName;
        token.csrfToken = u.csrfToken;
        token.field_user_perfildeodi = u.field_user_perfildeodi;
      }
      return token;
    },
    async session({ session, token }) {
      // Mapeo del token al objeto session
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as Record<string, string>;
        session.user.field_user_perfildeodi = token.field_user_perfildeodi as string;
        session.sessid = token.sessid as string;
        session.sessionName = token.sessionName as string;
        session.csrfToken = token.csrfToken as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  //debug: process.env.NODE_ENV === "development",
};
