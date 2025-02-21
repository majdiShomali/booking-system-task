"use client";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function MainHeroSection() {
  const { data: session } = useSession();

  return (
    <div className="relative h-[50vh] w-full overflow-hidden bg-gradient-to-br from-primary via-accent to-muted-foreground">
      <div className="absolute inset-0">
        <svg
          className="h-full w-full opacity-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center ">
        <motion.h1
          className="mb-4 text-6xl font-bold leading-tight md:text-7xl lg:text-8xl"
          style={{ direction: "rtl" }}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          حجز مستشار
        </motion.h1>
        <motion.p
          className="mb-8 text-xl md:text-2xl lg:text-3xl"
          style={{ direction: "rtl" }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          احصل على استشارة خبير في أي وقت وأي مكان
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
        >
          {session?.user?.id ? (
            <Link href={siteConfig.pages.USER.pioneers}>
              <Button className="text-lg font-semibold" size="lg">
                احجز الآن
              </Button>
            </Link>
          ) : (
            <Link href={siteConfig.pages.login}>
              <Button className="text-lg font-semibold" size="lg">
                سجل الدخول
              </Button>
            </Link>
          )}
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 transform"
        animate={{ y: [0, 10, 0] }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 1.5,
          ease: "easeInOut",
        }}
      >
        <ChevronDown className="h-8 w-8 opacity-70" />
      </motion.div>
    </div>
  );
}
