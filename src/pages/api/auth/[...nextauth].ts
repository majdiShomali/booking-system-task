import NextAuth, { Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/server/db";
import { SessionStrategy } from "next-auth";
import { JWT } from "next-auth/jwt";
import { ERole } from "@/types/auth.types";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        // Uncomment if you need password authentication
        // password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email) {
          return null; 
        }

        try {
          const user = await db.user.findUnique({
            where: { email: credentials.email },
            include: {
              role: true, 
            },
          });

          if (!user) {
            return null; 
          }

          // Uncomment if you need password validation
          // const isValidPassword = await compare(credentials.password, user.password);
          // if (!isValidPassword) {
          //   return null; // Return null if password is invalid
          // }

          return user; // Return the user object if authentication succeeds
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
        token.role = user.role?.name; 
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user && token) {
        session.user = {
          ...session.user,
          email: token.email as string,
          id: token.id as string,
          verified: token.verified as boolean,
          role: token.role as ERole, 
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin", 
  },
  secret: process.env.NEXTAUTH_SECRET, 

};

export default NextAuth(authOptions);