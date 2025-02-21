import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ModeSwitcher } from "./mode-switcher";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { siteConfig } from "@/config/site";
import UserMenu from "./user-menu";
import { ERole } from "@prisma/client";
const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-[11] flex h-[7vh] w-full items-center justify-between rounded-bl-lg rounded-br-lg bg-background backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Link
        href={
          siteConfig.pages[(session?.user.role as ERole) ?? ERole.USER].home
        }
        className="flex items-center justify-start gap-2 overflow-hidden rounded-md lg:w-1/3"
      >
        {/* <Image
          src={"/Qpioneers.png"}
          alt="Qpioneers"
          title="Qpioneers"
          width={30}
          height={30}
          className="rounded-r-lg"
          style={{ width: "auto", height: "auto" }}
        /> */}

        <p className="text-lg font-semibold uppercase">{siteConfig.name}</p>
      </Link>

      <section className="flex w-1/3 items-center justify-end px-2">
        <ModeSwitcher className="mx-2" />{" "}
        {session?.user.id ? (
          <UserMenu />
        ) : (
          <Link
            className="items-center justify-end gap-5"
            href={siteConfig.pages.login}
          >
            <Button>تسجيل الدخول</Button>
          </Link>
        )}
      </section>
    </nav>
  );
};

export default Navbar;
