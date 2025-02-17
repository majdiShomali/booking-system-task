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
        email: { label: "Email", type: "email" },
        // password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
  
        if (!credentials?.email) {
          throw new Error("Missing email")
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email },
          select: { id: true, email: true, hash: true, verified: true }, 
        });

        if (!user) {
          throw new Error("User not found");
        }

        // const isValidPassword = await compare(credentials.password, user.password);
        // if (!isValidPassword) {
        //   throw new Error("Invalid credentials");
        // }

        return user; // The entire user object is returned
      },
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy, 
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user?.email) {
        token.email = user.email;
        token.id = user.id;
        token.verified = user.verified;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user && token) {
        session.user = {
          ...session.user,
          email: token.email as string,
          id: token.id as string,
          verified: token.verified as boolean
        };
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
