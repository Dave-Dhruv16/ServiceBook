"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type CalendarProps = React.HTMLAttributes<HTMLDivElement> & {
  mode?: "single" | "range" | "multiple"
  selected?: Date | Date[]
  onSelect?: (date: Date | undefined) => void
  disabled?: (date: Date) => boolean
}

export function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps & { classNames?: any, showOutsideDays?: boolean }) {
  return (
    <div className={cn("p-3 pointer-events-none opacity-50 border rounded-md bg-muted/20 text-center", className)}>
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" size="icon" className="h-7 w-7"><ChevronLeft className="h-4 w-4" /></Button>
        <span className="font-medium text-sm">Calendar Mock</span>
        <Button variant="outline" size="icon" className="h-7 w-7"><ChevronRight className="h-4 w-4" /></Button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => <div key={d} className="font-bold text-muted-foreground">{d}</div>)}
        {[...Array(30)].map((_, i) => (
           <div key={i} className={`h-8 w-8 flex items-center justify-center rounded-md ${i === 14 ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}>
             {i + 1}
           </div>
        ))}
      </div>
       <div className="text-xs text-muted-foreground mt-2">
        (Interactive calendar component requires additional dependencies)
      </div>
    </div>
  )
}
