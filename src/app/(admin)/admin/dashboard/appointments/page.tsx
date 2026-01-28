import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MOCK_APPOINTMENTS, CURRENCY } from "@/constants";
import { Calendar, User, CheckCircle, XCircle } from "lucide-react";

export default function AdminAppointmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">All Appointments</h1>
          <p className="text-muted-foreground">System-wide booking registry (Mock Data).</p>
        </div>
        <Button variant="outline">Export CSV</Button>
      </div>

      <div className="grid gap-4">
        {MOCK_APPOINTMENTS.map((apt) => (
          <Card key={apt.id}>
            <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex gap-4 items-center">
                 <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                   <Calendar className="h-5 w-5 text-secondary-foreground" />
                 </div>
                 <div>
                   <h3 className="font-semibold">{apt.service}</h3>
                   <div className="text-sm text-muted-foreground flex gap-4">
                     <span className="flex items-center gap-1"><User className="h-3 w-3" /> {apt.providerName}</span>
                     <span>• {apt.date} at {apt.time}</span>
                   </div>
                 </div>
              </div>
              
              <div className="flex items-center gap-6">
                 <div className="font-semibold">{CURRENCY}{apt.price}</div>
                 <div className={`px-2 py-1 rounded-full text-xs font-semibold uppercase ${
                    apt.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                    apt.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                 }`}>
                   {apt.status}
                 </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
