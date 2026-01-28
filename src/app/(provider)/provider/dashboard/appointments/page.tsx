import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MOCK_APPOINTMENTS, CURRENCY } from "@/constants";
import { Calendar, Clock, MoreVertical, CheckCircle, XCircle } from "lucide-react";

export default function ProviderAppointmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
          <p className="text-muted-foreground">Manage your booking schedule.</p>
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
                    <h3 className="font-semibold text-lg">Client #{apt.id.split('-')[1]}</h3>
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
                </div>

                <div className="flex gap-2">
                   {apt.status === 'upcoming' && (
                     <>
                        <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700 hover:bg-green-50">
                          <CheckCircle className="h-4 w-4 mr-2" /> Complete
                        </Button>
                        <Button size="sm" variant="outline" className="text-destructive hover:text-destructive hover:bg-red-50">
                          <XCircle className="h-4 w-4 mr-2" /> Cancel
                        </Button>
                     </>
                   )}
                   <Button variant="ghost" size="icon">
                     <MoreVertical className="h-4 w-4" />
                   </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
