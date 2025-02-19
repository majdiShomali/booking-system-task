import type { Pioneer } from "@prisma/client";

interface TPioneer extends Pioneer {
  user: { 
    name: string; 
    image: string | null;
  };
}

export type { TPioneer };
