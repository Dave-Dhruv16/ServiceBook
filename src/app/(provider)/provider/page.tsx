"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Calendar, DollarSign, TrendingUp, CheckCircle, XCircle } from "lucide-react";
import { MOCK_APPOINTMENTS, CURRENCY } from "@/constants";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', total: 1500 },
  { name: 'Tue', total: 2300 },
  { name: 'Wed', total: 3200 },
  { name: 'Thu', total: 2100 },
  { name: 'Fri', total: 4500 },
  { name: 'Sat', total: 6000 },
  { name: 'Sun', total: 5500 },
];

export default function ProviderDashboardPage() {
  const myAppointments = MOCK_APPOINTMENTS; // Using all mock apps for demo purposes as "my" appointments
  const upcomingCount = myAppointments.filter(a => a.status === "upcoming").length;
  const earnings = myAppointments.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">Track your business performance and upcoming schedule.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm hover:shadow-md transition-all border-none bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{CURRENCY}{earnings}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-all border-none bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingCount}</div>
            <p className="text-xs text-muted-foreground">+5 new since yesterday</p>
          </CardContent>
        </Card>
         <Card className="shadow-sm hover:shadow-md transition-all border-none bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+2 since last week</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-all border-none bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">View Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8%</div>
            <p className="text-xs text-muted-foreground">+1.2% from last week</p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
         <Card className="col-span-4 shadow-sm border-none">
            <CardHeader>
               <CardTitle>Weekly Revenue</CardTitle>
               <CardDescription>Your earnings performance over the last 7 days.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
               <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
                        <XAxis 
                           dataKey="name" 
                           stroke="#888888" 
                           fontSize={12} 
                           tickLine={false} 
                           axisLine={false} 
                        />
                        <YAxis 
                           stroke="#888888" 
                           fontSize={12} 
                           tickLine={false} 
                           axisLine={false}
                           tickFormatter={(value) => `${CURRENCY}${value}`} 
                        />
                        <Tooltip 
                           cursor={{fill: 'transparent'}}
                           contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                        />
                        <Bar 
                           dataKey="total" 
                           fill="currentColor" 
                           radius={[4, 4, 0, 0]} 
                           className="fill-primary" 
                        />
                     </BarChart>
                  </ResponsiveContainer>
               </div>
            </CardContent>
         </Card>

         <Card className="col-span-3 shadow-sm border-none">
            <CardHeader>
               <CardTitle>Recent Appointments</CardTitle>
               <CardDescription>You made {upcomingCount} sales this month.</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {myAppointments.slice(0, 5).map((apt) => (
                    <div key={apt.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0 p-2 rounded hover:bg-muted/10 transition-colors">
                       <div className="flex items-center gap-4">
                          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                             <Users className="h-4 w-4 text-primary" />
                          </div>
                          <div className="space-y-1">
                             <p className="text-sm font-medium leading-none">Client #{apt.id.split('-')[1]}</p>
                             <p className="text-xs text-muted-foreground">{apt.service}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="text-sm font-medium">{CURRENCY}{apt.price}</p>
                          <p className="text-xs text-muted-foreground">{apt.date}</p>
                       </div>
                    </div>
                  ))}
               </div>
               <div className="mt-4 pt-4 border-t">
                  <Button variant="outline" className="w-full">View All Bookings</Button>
               </div>
            </CardContent>
         </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
           <Card className="shadow-sm border-none bg-gradient-to-br from-blue-50 to-white">
              <CardHeader><CardTitle className="text-lg text-blue-700">Calendar</CardTitle></CardHeader>
              <CardContent>
                 <Button variant="ghost" className="w-full justify-start text-blue-600 hover:bg-blue-100">
                    <Calendar className="mr-2 h-4 w-4" /> Manage Dates
                 </Button>
              </CardContent>
           </Card>
           <Card className="shadow-sm border-none bg-gradient-to-br from-green-50 to-white">
              <CardHeader><CardTitle className="text-lg text-green-700">Services</CardTitle></CardHeader>
              <CardContent>
                 <Button variant="ghost" className="w-full justify-start text-green-600 hover:bg-green-100">
                    <DollarSign className="mr-2 h-4 w-4" /> Update Pricing
                 </Button>
              </CardContent>
           </Card>
           <Card className="shadow-sm border-none bg-gradient-to-br from-purple-50 to-white">
              <CardHeader><CardTitle className="text-lg text-purple-700">Availability</CardTitle></CardHeader>
              <CardContent>
                 <Button variant="ghost" className="w-full justify-start text-purple-600 hover:bg-purple-100">
                    <CheckCircle className="mr-2 h-4 w-4" /> Accept Requests
                 </Button>
              </CardContent>
           </Card>
      </div>
    </div>
  );
}
