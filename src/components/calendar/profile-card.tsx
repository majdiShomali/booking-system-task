import { Twitter, Instagram, Linkedin, Clock, Facebook } from "lucide-react"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { Badge } from "../ui/badge"
import Link from "next/link"
import { TPioneer } from "@/types/pioneer.types"

interface ProfileCardProps {
  pioneer:TPioneer
}

export default function ProfileCard({
  pioneer
}: ProfileCardProps) {

  return (
    <Card className="w-full max-w-2xl  p-6  rtl">
      <div className="flex flex-col md:flex-row-reverse items-start gap-6">
        {/* Profile Image */}
    

        {/* Header Content */}
        <div className="flex-grow space-y-4">
            <div className="flex gap-3">

        <div className="flex-shrink-0 relative">
          <Image src={pioneer.user.image || "/avatars/02.png"} alt={pioneer.user.name} width={50} height={50} className="w-24 h-24 rounded-lg object-cover" />
        </div>
          <div className="space-y-1">
            <h1 className="text-xl font-semibold ">{pioneer.user.name}</h1>
            <p className="text-sm text-muted-foreground">{pioneer.title}</p>
            <p className="text-sm text-muted-foreground">{`خبرة ${pioneer.experience} عاماً`}</p>
          </div>
            </div>

          {/* Social Links */}
          <div className="flex gap-2">
            {pioneer.facebook && (
              <Link href={pioneer.facebook} className="p-2  transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
            )}
            {pioneer.instagram && (
              <Link href={pioneer.instagram} className="p-2 transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
            )}
            {pioneer.twitter && (
              <Link href={pioneer.twitter} className="p-2  transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
            )}
          </div>

          {/* Availability Badge */}
          {pioneer.available && (
                <Badge variant={'outline'} className={`space-x-1 w-fit px-2 flex items-center justify-center ${!pioneer.available? 'text-red-500' : 'text-green-500'} uppercase`}>
                <Clock size={15} className="mx-2"/>
                <span className="">
               {pioneer.available? " متاح للجلسات" : "غير متاح"}
                </span>
              </Badge>
          )}
        </div>
      </div>

      {/* Bio Section */}
      <div className="mt-6 space-y-4">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold ">نبذة تعريفية</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">{pioneer.bio}</p>
        </div>

        {/* Skills Section */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold ">نبذة</h2>
          <p className="text-sm text-muted-foreground mb-2">:أشياء يمكنني أن أفيدك بها</p>
          <ul className="space-y-2">
            {pioneer.skills?.map((skill, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                <span className="w-1 h-1 bg-accent rounded-full"></span>
                {skill}
              </li>
            ))}
          </ul>
        </div>

        {/* Additional Info */}
        {pioneer?.additional_information?.map((info, index) =>{
          return <p className="text-sm text-muted-foreground" key={index}>{info}</p>
        })}
      </div>
    </Card>
  )
}

