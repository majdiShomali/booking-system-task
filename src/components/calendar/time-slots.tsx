"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "../ui/card"

interface TimeSlot {
  time: string
  available: boolean
}

interface TimeSlotsProps {
  headerText?: string
  subHeaderText?: string
  onTimeSelect?: (time: string) => void
  onBooking?: (selectedTime: string) => void
  availableSlots?: TimeSlot[]
}

export default function TimeSlots({
  headerText = "الأوقات المتاحة",
  subHeaderText = "سيتم الحجز بتوقيت بلدك الحالي",
  onTimeSelect,
  onBooking,
  availableSlots = [
    { time: "11:00 AM", available: true },
    { time: "10:00 AM", available: true },
    { time: "09:00 AM", available: true },
    { time: "02:00 PM", available: true },
    { time: "01:00 PM", available: true },
    { time: "12:00 PM", available: true },
    { time: "04:00 PM", available: true },
    { time: "03:00 PM", available: true },
  ],
}: TimeSlotsProps) {
  const [selectedTime, setSelectedTime] = useState<string>("")

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    onTimeSelect?.(time)
  }

  const handleBooking = () => {
    if (selectedTime) {
      onBooking?.(selectedTime)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto p-3 space-y-2 rtl">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold text-start">{headerText}</h2>
        <p className="text-sm text-muted-foreground text-start">{subHeaderText}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {availableSlots.map((slot, index) => (
          <Button
          variant={"outline"}
            key={index}
            onClick={() => handleTimeSelect(slot.time)}
            disabled={!slot.available}
            className={cn(
              "py-1 px-2 rounded-lg border text-sm font-medium transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
              slot.available ? "hover:border-primary hover:text-primary" : "opacity-50 cursor-not-allowed",
              selectedTime === slot.time ? "border-primary text-primary bg-accent" : "border-muted-foreground ",
            )}
          >
            {slot.time}
          </Button>
        ))}
      </div>

      <Button className="w-full text-lg py-3" onClick={handleBooking} disabled={!selectedTime}>
        حجز جلسة
      </Button>
    </Card>
  )
}

