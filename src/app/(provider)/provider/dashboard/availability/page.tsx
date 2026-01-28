import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Clock } from "lucide-react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function AvailabilityPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Availability</h1>
          <p className="text-muted-foreground">Set your weekly working hours.</p>
        </div>
        <Button>Save Changes</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Schedule</CardTitle>
          <CardDescription>Configure the start and end time for each day.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
           {DAYS.map((day) => (
             <div key={day} className="flex items-center justify-between py-2 border-b last:border-0">
               <div className="w-32 font-medium">{day}</div>
               <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2 border rounded p-2 bg-background">
                   <Clock className="h-4 w-4 text-muted-foreground" />
                   <span className="text-sm">09:00 AM</span>
                 </div>
                 <span className="text-muted-foreground">-</span>
                 <div className="flex items-center gap-2 border rounded p-2 bg-background">
                   <Clock className="h-4 w-4 text-muted-foreground" />
                   <span className="text-sm">05:00 PM</span>
                 </div>
               </div>
               <div className="flex items-center gap-2">
                  <Button variant="ghost" className="text-muted-foreground">Unavailable</Button>
               </div>
             </div>
           ))}
        </CardContent>
      </Card>
    </div>
  );
}
