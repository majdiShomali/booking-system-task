"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { api } from "@/utils/api";
import { Clock, Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { TPioneer } from "@/types/pioneer.types";
import { useSession } from "next-auth/react";
import { siteConfig } from "@/config/site";

const PioneerCard: React.FC<{ pioneer: TPioneer }> = ({ pioneer }) => {
  return (
    <Link
      className="w-full"
      href={`${siteConfig.pages.USER.pioneers}/${pioneer.id}`}
    >
      <Card className="w-full overflow-hidden transition-all hover:shadow-lg lg:w-96">
        <CardHeader className="relative h-48 p-0">
          <Image
            src={pioneer.user.image ?? "/avatars/01.png"}
            alt={pioneer.user.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{pioneer.user.name}</h2>
              <p className="text-sm">{pioneer.title}</p>
            </div>
            {pioneer.available ? (
              <Badge variant="secondary" className="bg-green-500">
                <Clock size={12} className="mr-1" />
                متاح للجلسات
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-red-500">
                <Clock size={12} className="mr-1" />
                غير متاح
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4 p-4">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <Badge variant="outline" className="text-sm">
              خبرة {pioneer.experience} عاماً
            </Badge>
            <div className="flex space-x-2 rtl:space-x-reverse">
              {pioneer.facebook && (
                <Button variant="ghost" size="icon" asChild>
                  <Link href={pioneer.facebook}>
                    <Facebook className="h-4 w-4" />
                  </Link>
                </Button>
              )}
              {pioneer.instagram && (
                <Button variant="ghost" size="icon" asChild>
                  <Link href={pioneer.instagram}>
                    <Instagram className="h-4 w-4" />
                  </Link>
                </Button>
              )}
              {pioneer.twitter && (
                <Button variant="ghost" size="icon" asChild>
                  <Link href={pioneer.twitter}>
                    <Twitter className="h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
          <div className="h-20 space-y-2">
            <h3 className="text-lg font-semibold">نبذة تعريفية</h3>
            <p className="line-clamp-3 text-sm text-muted-foreground">
              {pioneer.bio}
            </p>
          </div>
          <div className="h-24 space-y-2">
            <h3 className="text-lg font-semibold">المهارات</h3>
            <div className="flex flex-wrap gap-2">
              {pioneer.skills?.map((skill: string, index: number) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          {pioneer?.additional_information && (
            <div className="h-20 space-y-2">
              <h3 className="text-lg font-semibold">معلومات إضافية</h3>
              {pioneer.additional_information.map(
                (info: string, index: number) => (
                  <p key={index} className="text-sm text-muted-foreground">
                    {info}
                  </p>
                ),
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

const PioneerCardSkeleton: React.FC = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <CardHeader className="relative h-48 p-0">
            <Skeleton className="h-full w-full" />
          </CardHeader>
          <CardContent className="space-y-4 p-4">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 3 }).map((_, j) => (
                  <Skeleton key={j} className="h-6 w-16" />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const PrivatePioneerCard: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-5">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="relative w-full overflow-hidden lg:w-1/4">
          <Link
            href={siteConfig.pages.login}
            className="absolute inset-0 z-10 flex items-center justify-center bg-black/50"
          >
            <p className="text-lg font-semibold text-primary underline">
              سجل الدخول
            </p>
          </Link>
          <CardHeader className="relative h-48 p-0">
            <Image
              src={`/avatars/0${i + 1}.png`}
              alt={"Pioneer Avatar"}
              layout="fill"
              objectFit="cover"
              className="blur-sm transition-transform hover:scale-105"
            />
          </CardHeader>
          <CardContent className="space-y-4 p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-lg font-semibold">اسم المستشار </p>
                <p className="text-sm text-muted-foreground">نبذة</p>
              </div>
              <Badge variant="secondary" className="bg-gray-500 text-white">
                <Clock size={12} className="mr-1" />
                مخفي
              </Badge>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">المهارات</h3>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 3 }).map((_, j) => (
                  <Badge key={j} variant="secondary" className="blur-sm">
                    Skill {j + 1}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">نبذة تعريفية</h3>
              <p className="line-clamp-3 text-sm text-muted-foreground blur-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="ghost" size="icon" disabled>
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" disabled>
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" disabled>
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export { PioneerCard, PrivatePioneerCard, PioneerCardSkeleton };
