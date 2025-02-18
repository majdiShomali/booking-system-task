import { useSession } from "next-auth/react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { siteConfig } from "@/config/site";
import { ERole } from "@/types/auth.types";
import Link from "next/link";

type Props = {};
const UserMenu: React.FC<Props> = ({}) => {
  const { data: session } = useSession();

  if (!session?.user) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage
            src={session.user.image || "/avatars/01.png"}
            alt={session.user.name}
          />
          <AvatarFallback className="uppercase">
            {session.user.name}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-end">
        <DropdownMenuLabel>حسابي</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <Link
            className="w-full flex items-center justify-between"
              href={siteConfig.pages[session?.user.role || ERole.USER].profile}
            >
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              <span className="w-full">الحساب الشخصي</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() =>
            signOut({
              redirect: true,
              callbackUrl: siteConfig.pages.login,
            })
          }
        >
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          <span className="w-full">تسجيل الخروج</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
