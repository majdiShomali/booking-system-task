import { useSession } from "next-auth/react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { ERole } from "@prisma/client";


const UserMenu: React.FC = () => {
  const { data: session } = useSession();

  if (!session?.user) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage
            src={session.user.image ?? "/avatars/01.png"}
            alt={session.user.name}
          />
          <AvatarFallback className="uppercase">
            {session.user.name}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-end">
        <DropdownMenuLabel className="space-y-2">
          <p className="flex items-center justify-between">
          <span>{session.user.name}</span>
          <span>{"حسابي"}</span>
          </p>
       
          <p className="text-sm text-muted-foreground">{session.user.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <Link
            className="w-full flex items-center justify-between"
              href={siteConfig.pages[session?.user.role as ERole ?? ERole.USER].profile}
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
