import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { SessionStrategy, User, Session } from "next-auth";
import { type JWT } from "next-auth/jwt";
import authHelper from "@/helpers/auth.helper";
import { siteConfig } from "@/config/site";
import { userService } from "@/server/api/services/user.service";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email) {
          return null;
        }

        try {
          const user = await userService.getUserByEmail(credentials.email);
          if (!user) {
            return null;
          }
          const isValidPassword = authHelper.validatePassword(
            user.salt,
            user.hash,
            credentials.password,
          );

          if (!isValidPassword) {
            return null;
          }

          return {
            ...user,
            role: user.role,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        token.email = user.email;
        token.id = user.id;
        token.verified = user.verified;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (
        session.user?.email &&
        token?.email &&
        typeof token.id === "string" 
      ) {
        session.user = {
          ...session.user,
          email: token.email,
          id: token.id,
          verified: Boolean(token.verified),
          role: token.role,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: siteConfig.pages.login,
    signUp: siteConfig.pages.signup,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
