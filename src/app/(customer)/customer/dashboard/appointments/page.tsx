import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MOCK_APPOINTMENTS, CURRENCY } from "@/constants";
import { Calendar, Clock, MoreVertical, MapPin } from "lucide-react";

export default function AppointmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Appointments</h1>
          <p className="text-muted-foreground">View and manage your booking history</p>
        </div>
      </div>

      <div className="grid gap-4">
        {MOCK_APPOINTMENTS.map((apt) => (
          <Card key={apt.id}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex gap-4 items-center">
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                    apt.status === 'upcoming' ? 'bg-primary/10 text-primary' : 
                    apt.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{apt.providerName}</h3>
                    <p className="text-muted-foreground">{apt.service}</p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-sm">
                   <div className="flex items-center gap-2">
                     <Calendar className="h-4 w-4 text-muted-foreground" />
                     <span>{apt.date}</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <Clock className="h-4 w-4 text-muted-foreground" />
                     <span>{apt.time}</span>
                   </div>
                   <div className="flex items-center gap-2 font-medium">
                     {CURRENCY}{apt.price}
                   </div>
                   <div className="flex items-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
                        apt.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                        apt.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {apt.status}
                      </span>
                   </div>
                </div>

                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
