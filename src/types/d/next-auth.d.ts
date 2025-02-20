import type { ERole } from "../auth.types";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string ;
      image?: string | null;
      verified:boolean;
      role:ERole;
    };
  }
  interface User extends DefaultUser {
    verified: boolean;
    role:ERole
  }

}
