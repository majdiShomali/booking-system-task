import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { Frown, Moon } from "lucide-react";
import Link from "next/link";

// pages/404.js
export default function Custom404() {
    return (
      <div className="w-full h-screen flex items-center justify-center">

      <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6 text-center">
        <Frown className="w-16 h-16 mx-auto mb-4 text-red-500" />
        <h2 className="text-2xl font-bold mb-2">عذرا   </h2>
        <p className="text-muted-foreground mb-4"> هذه الصفحة غير موجودة </p>
        <div className="flex items-center justify-center">
          <Moon className="w-6 h-6 text-muted mr-2 animate-pulse" />
          <Link href={siteConfig.pages.home} className="text-sm underline">  العودة الى القائمة </Link>
        </div>
      </CardContent>
    </Card>
      </div>
    );
  }
  