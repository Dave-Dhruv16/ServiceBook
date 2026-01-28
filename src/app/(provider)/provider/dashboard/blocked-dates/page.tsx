import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar"; // Assuming shadcn calendar, but using standard UI for now
import { Plus } from "lucide-react";

export default function BlockedDatesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blocked Dates</h1>
          <p className="text-muted-foreground">Manage time off and holidays.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Time Off
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
           <CardHeader>
             <CardTitle>Upcoming Time Off</CardTitle>
           </CardHeader>
           <CardContent>
             <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">Summer Vacation</p>
                    <p className="text-sm text-muted-foreground">Jul 15 - Jul 22, 2024</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-destructive">Remove</Button>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">Personal Day</p>
                    <p className="text-sm text-muted-foreground">Aug 05, 2024</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-destructive">Remove</Button>
                </div>
             </div>
           </CardContent>
        </Card>
      </div>
    </div>
  );
}
