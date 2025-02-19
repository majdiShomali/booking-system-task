"use client"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet"
import { META_THEME_COLORS } from "@/config/site"
import { useMetaColor } from "@/hooks/use-meta-color"
import { Menu} from "lucide-react"
import { useTheme } from "next-themes"
import { useCallback, useState } from "react"

export function NavSheet() {
  const [isOpen, setIsOpen] = useState(false)

  // const handleLinkClick = () => {
  //   setIsOpen(false)
  // }
  const {theme, setTheme, resolvedTheme } = useTheme()
  const { setMetaColor } = useMetaColor()

  const toggleTheme = useCallback((resolvedTheme:"light" | "dark") => {
    setTheme(resolvedTheme)
    setMetaColor(
      resolvedTheme === "dark"
        ? META_THEME_COLORS.light
        : META_THEME_COLORS.dark
    )
  }, [resolvedTheme, setTheme, setMetaColor])
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent  className="w-60 max-w-60">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <section className="flex flex-col gap-5">
            {/* <Link
              className="flex items-center gap-2 hover:underline capitalize"
              href={`#${layoutConstants.layout.pageLinks.skills}`}
              onClick={handleLinkClick}
            >
              <Puzzle className="h-5 w-5" />
              {layoutConstants.layout.pageLinks.skills}
            </Link>
            <Link
              className="flex items-center gap-2 hover:underline capitalize"
              href={`#${layoutConstants.layout.pageLinks.projects}`}
              onClick={handleLinkClick}
            >
              <Folder className="h-5 w-5" />
              {layoutConstants.layout.pageLinks.projects}
            </Link>
            <Link
              className="flex items-center gap-2 hover:underline capitalize"
              href={`#${layoutConstants.layout.pageLinks.experience}`}
              onClick={handleLinkClick}
            >
              <Briefcase className="h-5 w-5" />
              {layoutConstants.layout.pageLinks.experience}
            </Link>
            <Link
              className="flex items-center gap-2 hover:underline capitalize"
              href={`#${layoutConstants.layout.pageLinks.information}`}
              onClick={handleLinkClick}
            >
              <Info className="h-5 w-5" />
              {layoutConstants.layout.pageLinks.information}
            </Link>
            <Link
              className="flex items-center gap-2 hover:underline capitalize"
              href={`#${layoutConstants.layout.pageLinks.contact}`}
              onClick={handleLinkClick}
            >
              <Mail className="h-5 w-5" />
              {layoutConstants.layout.pageLinks.contact}
            </Link> */}
          </section>

          <div onClick={()=>toggleTheme('light')} className={`items-center rounded-md border-2 border-muted p-1 hover:bg-accent hover:text-accent-foreground cursor-pointer ${theme ==='light' ? 'border-primary' :'' }`}>
      <div  className="space-y-2 rounded-sm bg-[#ecedef] p-2">
        <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
          <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
        </div>
        <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
          <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
        </div>
        <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
          <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
        </div>
      </div>
    </div>

    <div onClick={()=>toggleTheme('dark')} className={`items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground cursor-pointer ${theme ==='dark' ? 'border-primary' :'' }`}>
      <div className="space-y-2 rounded-sm bg-slate-950 p-2">
        <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
          <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
          <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
        </div>
        <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
          <div className="h-4 w-4 rounded-full bg-slate-400" />
          <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
        </div>
        <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
          <div className="h-4 w-4 rounded-full bg-slate-400" />
          <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
        </div>
      </div>
    </div>

        </div>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

