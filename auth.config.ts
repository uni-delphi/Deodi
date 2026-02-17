import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { loginUser } from "@/lib/services/user/user.services";

// 👇 Interfaz que refleja la estructura real que devuelve Drupal
export interface DrupalField {
  und: Array<{ target_id: string }>;
}

export interface DrupalUserSession extends User {
  sessid: string;
  sessionName: string;
  csrfToken: string;
  role: Record<string, string>;
  field_user_perfildeodi: DrupalField; // 👈 Ya no es string
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) return null;
        try {
          const drupalUser = await loginUser({
            username: credentials.email,
            password: credentials.password,
          });

          if (!drupalUser) return null;

          const user: DrupalUserSession = {
            id: drupalUser.user.uid,
            name: drupalUser.user.name,
            lastName: drupalUser.user.name,
            email: drupalUser.user.mail,
            role: drupalUser.user.roles,
            sessid: drupalUser.sessid,
            sessionName: drupalUser.session_name,
            csrfToken: drupalUser.token,
            field_user_perfildeodi: drupalUser.user
              .field_user_perfildeodi as unknown as DrupalField, // 👈 Ahora es DrupalField
          };

          return user;
        } catch (error) {
          console.log("🚀 ~ authorize ~ error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/",
    verifyRequest: "/auth/verify-request",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }: { user: any; account: any }): Promise<any> {
      if (account.provider === "google") {
        try {
          const { name, email } = user;
          const createdUser = {
            id: "1",
            name,
            email,
            lastName: "",
            role: "user",
            password: "",
            validatedPassword: "",
          };
          if (!createdUser) return null;
          const { password, validatedPassword, ...props } = createdUser;
          return props;
        } catch (error) {
          console.log("🚀 ~ signIn ~ error:", error);
        }
      }
      return true;
    },
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        const {
          id,
          name,
          lastName,
          email,
          role,
          field_user_perfildeodi,
          sessid,
          sessionName,
          csrfToken,
        } = user as DrupalUserSession;
        token.id = id;
        token.name = name ?? "";
        token.lastName = lastName ?? "";
        token.email = email;
        token.role = role;
        token.field_user_perfildeodi = field_user_perfildeodi.und[0].target_id;
        token.sessid = sessid;
        token.sessionName = sessionName;
        token.csrfToken = csrfToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.lastName = token.lastName as string;
        session.user.email = token.email as string;
        session.user.role = token.role as Record<string, string>;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
