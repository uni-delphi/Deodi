import { Account, NextAuthOptions, User } from "next-auth";

import bcrypt from "bcrypt";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { loginUser } from "@/lib/services/user/user.services";


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
          const user = await loginUser({
            email: credentials.email,
            password: credentials.password,
          });
          //console.log("🚀 ~ authorize ~ user:", user)

          if (!user) return null;
          return user; // 🔑 NextAuth la guarda en la sesión
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
    async jwt({ token,  user }: { token: any; user: any }) {
      const { uid, mail, name, roles } = user?.user || {};      
      if (user) {
        token.id = uid;
        token.name = name;
        token.role = roles;
        token.email = mail;
      }      
      return token;
    },
    async session({ session, token }) {      
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.lastName = token.name as string;
        session.user.name = token.name as string;
        session.user.email = token.mail as string;
      }      
      console.log("🚀 ~ session ~ session:", session)

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  //debug: process.env.NODE_ENV === "development",
};
