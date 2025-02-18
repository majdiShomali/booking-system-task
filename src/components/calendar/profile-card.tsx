import { Twitter, Instagram, Linkedin, Clock } from "lucide-react"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { Badge } from "../ui/badge"
import Link from "next/link"

interface ProfileCardProps {
  name: string
  title: string
  experience: string
  image: string
  bio: string
  skills: string[]
  available?: boolean
  socialLinks: {
    linkedin?: string
    instagram?: string
    twitter?: string
  }
}

export default function ProfileCard({
  name,
  title,
  experience,
  image,
  bio,
  skills,
  available,
  socialLinks,
}: ProfileCardProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto p-6  rtl">
      <div className="flex flex-col md:flex-row-reverse items-start gap-6">
        {/* Profile Image */}
    

        {/* Header Content */}
        <div className="flex-grow space-y-4">
            <div className="flex gap-3">

        <div className="flex-shrink-0 relative">
          <Image src={image || "/placeholder.svg"} alt={name} width={50} height={50} className="w-24 h-24 rounded-lg object-cover" />
        </div>
          <div className="space-y-1">
            <h1 className="text-xl font-semibold ">{name}</h1>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-sm text-muted-foreground">{experience}</p>
          </div>
            </div>

          {/* Social Links */}
          <div className="flex gap-2">
            {socialLinks.linkedin && (
              <Link href={socialLinks.linkedin} className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            )}
            {socialLinks.instagram && (
              <Link href={socialLinks.instagram} className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
            )}
            {socialLinks.twitter && (
              <Link href={socialLinks.twitter} className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
            )}
          </div>

          {/* Availability Badge */}
          {available && (
                <Badge variant={'outline'} className={`space-x-1 w-fit px-2 flex items-center justify-center ${!available? 'text-red-500' : 'text-green-500'} uppercase`}>
                <Clock size={15} className="mx-2"/>
                <span className="">
               {available? " متاح للجلسات" : "غير متاح"}
                </span>
              </Badge>
          )}
        </div>
      </div>

      {/* Bio Section */}
      <div className="mt-6 space-y-4">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold ">نبذة تعريفية</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">{bio}</p>
        </div>

        {/* Skills Section */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold ">نبذة</h2>
          <p className="text-sm text-muted-foreground mb-2">:أشياء يمكنني أن أفيدك بها</p>
          <ul className="space-y-2">
            {skills.map((skill, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                <span className="w-1 h-1 bg-accent rounded-full"></span>
                {skill}
              </li>
            ))}
          </ul>
        </div>

        {/* Additional Info */}
        <p className="text-sm muted-foreground pt-4">أحب مشاهدة الآخرين ، وخاصة رواد الأعمال الجامعين.</p>
        <p className="text-sm text-muted-foreground">توسيع نطاق مجتمع المؤسسين الخاص حالياً.</p>
      </div>
    </Card>
  )
}

