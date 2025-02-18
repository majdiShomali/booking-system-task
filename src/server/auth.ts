import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";


export const getAuthSession = async () => {
  return await getServerSession(authOptions);
};
