// types/next-auth.d.ts
import NextAuth from "next-auth";
import { ERole } from "../auth.types";
import { UserRole } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string | null;
      email: string | null;
      image?: string | null;
      verified:boolean;
      role:ERole;
    };
  }
  interface User extends DefaultUser {
    verified: boolean;
    role:UserRole
  }
}
