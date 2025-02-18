"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Card } from "../ui/card"

interface CalendarProps {
  locale?: string
  selectedDate?: Date
  onDateSelect?: (date: Date) => void
  events?: Date[]
  headerText?: string
  subHeaderText?: string
}

export default function Calendar({
  locale = "ar-SA",
  selectedDate,
  onDateSelect,
  events = [],
  headerText = "الأيام المتاحة",
  subHeaderText = "مدة الجلسة 60 دقيقة محددة سابقاً من قبل المستشار",
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  // Get days in month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDayOfMonth = new Date(year, month, 1).getDay()

    const days = []

    // Add previous month's days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i)
      days.push({ date: prevDate, isCurrentMonth: false })
    }

    // Add current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i)
      days.push({ date: currentDate, isCurrentMonth: true })
    }

    // Add next month's days
    const remainingDays = 42 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(year, month + 1, i)
      days.push({ date: nextDate, isCurrentMonth: false })
    }

    return days
  }

  const days = getDaysInMonth(currentDate)
  const weekDays = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"]

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const isSelectedDate = (date: Date) => {
    return selectedDate?.toDateString() === date.toDateString()
  }

  const hasEvent = (date: Date) => {
    return events.some((event) => event.toDateString() === date.toDateString())
  }

  return (
    <Card className="w-full max-w-md mx-auto   p-3 space-y-4 rtl ">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold ">{headerText}</h2>
        <p className="text-sm text-muted-foreground">{subHeaderText}</p>
      </div>

      <div className="flex items-center justify-between">
        <Button onClick={handlePrevMonth} className="p-2">
          <ChevronRight className="h-5 w-5" />
        </Button>
        <h3 className="font-medium">{currentDate.toLocaleDateString(locale, { month: "long", year: "numeric",  calendar: "gregory",
 })}</h3>
        <Button onClick={handleNextMonth} className="p-2">
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((day) => (
          <div key={day} className="text-center py-2 text-sm font-medium">
            {day}
          </div>
        ))}

        {days.map(({ date, isCurrentMonth }, index) => (
          <Button
            key={index}
            onClick={() => onDateSelect?.(date)}
            disabled={!isCurrentMonth}
            variant={'outline'}
            className={cn(
              "aspect-square flex items-center justify-center p-2 text-sm rounded-md",
              !isCurrentMonth && "",
              isCurrentMonth && "",
              isSelectedDate(date) && "bg-blue-500 text-white hover:bg-blue-600",
              hasEvent(date) && !isSelectedDate(date) && "border-2 bg-primary text-secondary-foreground ",
            )}
          >
            {date.getDate()}
          </Button>
        ))}
      </div>
    </Card>
  )
}

