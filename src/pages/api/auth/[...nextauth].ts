import NextAuth, { Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/server/db";
import { SessionStrategy } from "next-auth";
import { JWT } from "next-auth/jwt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
      },
      authorize: async (credentials) => {
        const user = await db.user.findUnique({
          where: { email: credentials?.email },
        });

        if (user && user.email === credentials?.email) {
          return user; 
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy, 
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user?.email) {
        token.email = user.email;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user && token) {
        session.user = {
          ...session.user,
          email: token.email as string,
          id: token.id as string,
        };
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
