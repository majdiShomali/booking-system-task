import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
type Props = {
  day: {
    date: Date;
    isCurrentMonth: boolean;
}
selectedDate?:Date;
events?: Date[];
onDateSelect?: (date: Date) => void;


};
const CalendarDayDialog: React.FC<Props> = ({day,selectedDate,events,onDateSelect}) => {
  
  const isSelectedDate = (date: Date) => {
    return selectedDate?.toDateString() === date.toDateString();
  };

  const hasEvent = (date: Date) => {
    return events?.some((event) => event.toDateString() === date.toDateString());
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
         onClick={() => onDateSelect?.(day.date)}

           disabled={!day.isCurrentMonth}
           className={cn(
              "flex aspect-square items-center justify-center rounded-md p-2 text-sm",
              !day.isCurrentMonth && "",
              day.isCurrentMonth && "",
              isSelectedDate(day.date) &&
                "bg-blue-500 text-white hover:bg-blue-600",
              hasEvent(day.date) &&
                !isSelectedDate(day.date) &&
                "border-2 bg-primary text-secondary-foreground",
            )}
        
        variant="outline">
        {day.date.getDate()}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CalendarDayDialog;
