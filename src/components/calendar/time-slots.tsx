"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface TimeSlot {
  session_id: string
  time: string
  available: boolean
}

interface TimeSlotsProps {
  onTimeSelect?: (time: string) => void
  onBooking?: (selectedTime: string) => void
  availableSlots?: TimeSlot[]
  loading: boolean
}

export default function TimeSlots({ onTimeSelect, onBooking, availableSlots, loading }: TimeSlotsProps) {
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
        <h2 className="text-xl font-semibold text-start">{"الأوقات المتاحة"}</h2>
        <p className="text-sm text-muted-foreground text-start">{"سيتم الحجز بتوقيت بلدك الحالي"}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} className="h-10 w-full" />)
          : availableSlots && availableSlots?.length > 0 ? availableSlots?.map((slot, index) => (
              <Button
                variant="outline"
                key={index}
                onClick={() => handleTimeSelect(slot.time)}
                disabled={!slot.available}
                className={cn(
                  "py-1 px-2 rounded-lg border text-sm font-medium transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
                  slot.available ? "hover:border-primary hover:text-primary" : "opacity-50 cursor-not-allowed",
                  selectedTime === slot.time ? "border-primary text-primary bg-accent" : "border-muted-foreground",
                )}
              >
                {slot.time}
              </Button>
            )):<p>{"لا يوجد اوقات متاحة"}</p>}
      </div>

      <Button className="w-full text-lg py-3" onClick={handleBooking} disabled={!selectedTime || loading}>
        {loading ? <Skeleton className="h-6 w-24" /> : "حجز جلسة"}
      </Button>
    </Card>
  )
}

