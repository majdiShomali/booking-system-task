"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { api } from "@/utils/api"
import { Clock, Facebook, Instagram, Twitter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type React from "react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import type { TPioneer } from "@/types/pioneer.types"

const AllPioneers: React.FC = () => {
  const { data: pioneers, error, isLoading } = api.pioneer.getAll.useQuery()

  if (isLoading) {
    return <PioneerCardSkeleton />
  }

  if (error) {
    return <div className="text-center text-red-500">Error loading pioneers: {error.message}</div>
  }

  return (
    <div className="flex items-center justify-center gap-5 flex-wrap">
      {pioneers?.map((pioneer) => (
        <PioneerCard key={pioneer.id} pioneer={pioneer} />
      ))}
    </div>
  )
}

const PioneerCard: React.FC<{ pioneer: TPioneer }> = ({ pioneer }) => {
  return (
    <Link className="w-full lg:w-[40%]" href={`/pioneers/${pioneer.id}`}>
    <Card className="overflow-hidden transition-all hover:shadow-lg min-w-80">
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
            <h2 className="text-2xl font-bold text-white">{pioneer.user.name}</h2>
            <p className="text-sm text-gray-200">{pioneer.title}</p>
          </div>
          {pioneer.available ? (
            <Badge variant="secondary" className="bg-green-500 text-white">
              <Clock size={12} className="mr-1" />
              متاح للجلسات
            </Badge>
          ):
          <Badge variant="secondary" className="bg-red-500 text-white">
          <Clock size={12} className="mr-1" />
          غير متاح
        </Badge>
          }
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
        <div className="space-y-2 h-20">
          <h3 className="text-lg font-semibold">نبذة تعريفية</h3>
          <p className="text-sm text-muted-foreground line-clamp-3">{pioneer.bio}</p>
        </div>
        <div className="space-y-2 h-24">
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
          <div className="space-y-2  h-20">
            <h3 className="text-lg font-semibold">معلومات إضافية</h3>
            {pioneer.additional_information.map((info: string, index: number) => (
              <p key={index} className="text-sm text-muted-foreground">
                {info}
              </p>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
    </Link>
  )
}

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
  )
}

export default AllPioneers

