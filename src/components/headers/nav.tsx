import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ModeSwitcher } from "./mode-switcher";
import { NavSheet } from "./nav-sheet";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { siteConfig } from "@/config/site";
const Navbar = () => {
      const { data: session } = useSession();
  
  return (
    <nav className="fixed top-0 z-[11] flex w-full items-center justify-between rounded-bl-lg rounded-br-lg bg-background backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Link
        href={"/"}
        className="flex items-center justify-start gap-2 overflow-hidden rounded-md lg:w-1/3"
      >
        <Image
          src="/Qpioneers.png"
          alt="Qpioneers"
          title="Qpioneers"
          width={50}
          height={50}
          className="rounded-r-lg"
          sizes="800"
        />

        <p className="text-lg font-semibold uppercase">
          {siteConfig.name}
        </p>
      </Link>

      <section className="flex w-1/3 items-center justify-end px-2">
        <ModeSwitcher className="mx-2" />
   
          {" "}
          {session?.user.id ?
          <>AVATAR</>  
          :
          <Link
          className="hidden items-center justify-end gap-5 lg:flex"
          href={siteConfig.pages.login}
        >
          <Button>تسجيل الدخول</Button>
          </Link>
           }
       
        <div className="flex w-1/3 items-center justify-end pr-2 lg:hidden">
          <NavSheet />
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
