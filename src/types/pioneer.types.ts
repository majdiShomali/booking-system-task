import { Pioneer } from "@prisma/client";

interface TPioneer extends Pioneer {
  user: { 
    name: string; 
    image: string;
  };
}

export type { TPioneer };
