"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_APPOINTMENTS, CURRENCY, ROLES } from "@/constants";
import ProtectedRoute from "@/components/auth/protected-route";
import { useAuth } from "@/context/AuthContext";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle, 
  AlertCircle, 
  Plus, 
  Search, 
  ArrowRight,
  Star
} from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();
  const upcomingAppointments = MOCK_APPOINTMENTS.filter(a => a.status === "upcoming");
  const pastAppointments = MOCK_APPOINTMENTS.filter(a => a.status === "completed");
  
  // Determine initial greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 12 && hour < 17) return "Good afternoon";
    if (hour >= 17) return "Good evening";
    return "Good morning";
  };

  const [isLoading, setIsLoading] = useState(true);
  const [greeting, setGreeting] = useState(() => getGreeting());

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ProtectedRoute allowedRoles={[ROLES.CUSTOMER]}>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              {greeting}, {user?.firstName || "Guest"}!
            </h1>
            <p className="text-muted-foreground mt-1">
              Here&apos;s what&apos;s happening with your appointments today.
            </p>
          </div>
          <div className="flex gap-2">
             <Link href="/services">
              <Button variant="outline" className="shadow-sm">
                <Search className="mr-2 h-4 w-4" /> Browse Services
              </Button>
             </Link>
             <Link href="/providers">
              <Button className="shadow-md hover:shadow-lg transition-all bg-gradient-to-r from-primary to-primary/90">
                <Plus className="mr-2 h-4 w-4" /> New Booking
              </Button>
             </Link>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: "Upcoming", icon: Calendar, value: upcomingAppointments.length, color: "text-blue-500", bg: "bg-blue-500/10" },
            { title: "Completed", icon: CheckCircle, value: pastAppointments.length, color: "text-green-500", bg: "bg-green-500/10" },
            { title: "Favorites", icon: Star, value: "4", color: "text-yellow-500", bg: "bg-yellow-500/10" },
            { title: "Total Spent", icon: AlertCircle, value: `${CURRENCY}450`, color: "text-purple-500", bg: "bg-purple-500/10" }
          ].map((stat, i) => (
            <Card key={i} className="border-none shadow-sm hover:shadow-md transition-all hover:scale-[1.02] cursor-pointer">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  {isLoading ? (
                    <div className="h-8 w-16 bg-muted animate-pulse rounded mt-1" />
                  ) : (
                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  )}
                </div>
                <div className={`h-12 w-12 rounded-full flex items-center justify-center ${stat.bg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content: Upcoming Appointments */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" /> Upcoming Appointments
              </h2>
              <Link href="/dashboard/appointments" className="text-sm text-primary hover:underline flex items-center">
                View all <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>

            {isLoading ? (
               <div className="space-y-4">
                 {[1, 2].map(i => (
                   <Card key={i} className="border-none shadow-sm h-32">
                     <CardContent className="p-6 flex items-center gap-4">
                       <div className="h-16 w-16 rounded-lg bg-muted animate-pulse" />
                       <div className="space-y-2 flex-1">
                         <div className="h-5 w-3/4 bg-muted animate-pulse rounded" />
                         <div className="h-4 w-1/2 bg-muted animate-pulse rounded" />
                       </div>
                     </CardContent>
                   </Card>
                 ))}
               </div>
            ) : upcomingAppointments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAppointments.map((apt) => (
                  <Card key={apt.id} className="group border-none shadow-sm hover:shadow-md transition-all overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        
                        {/* Left: Provider & Service Info */}
                        <div className="flex gap-4 items-center">
                          <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shadow-inner">
                            <span className="text-xl font-bold text-primary">{apt.date.split('-')[2]}</span>
                          </div>
                          <div>
                            <h3 className="font-bold text-lg leading-none mb-1 group-hover:text-primary transition-colors">{apt.service}</h3>
                            <div className="flex items-center text-muted-foreground text-sm gap-2">
                               <span className="font-medium text-foreground">{apt.providerName}</span>
                               <span>•</span>
                               <span>{apt.time}</span>
                            </div>
                          </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-2 sm:self-center self-start">
                          <Badge variant="secondary" className="px-3 py-1 bg-green-500/10 text-green-700 hover:bg-green-500/20 border-none">
                            Confirmed
                          </Badge>
                          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            Details
                          </Button>
                          <Button size="sm" variant="outline">Reschedule</Button>
                        </div>

                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
               <Card className="border-dashed shadow-none bg-muted/30">
                 <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                   <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                     <Calendar className="h-6 w-6 text-muted-foreground" />
                   </div>
                   <h3 className="font-semibold text-lg">No upcoming plans</h3>
                   <p className="text-muted-foreground mb-4 max-w-sm">You don&apos;t have any appointments scheduled for the near future.</p>
                   <Link href="/services">
                     <Button>Book your first service</Button>
                   </Link>
                 </CardContent>
               </Card>
            )}
            
            {/* Recent Booking History Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold tracking-tight text-muted-foreground">Recent History</h2>
              </div>
              
              <Card className="border-none shadow-sm">
                <CardContent className="p-0">
                  <div className="divide-y">
                    {pastAppointments.length > 0 ? (
                      pastAppointments.slice(0, 3).map((apt) => (
                        <div key={apt.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-muted/30 transition-colors gap-4">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center border border-green-200">
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{apt.service}</p>
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                {apt.providerName}
                                <span className="h-1 w-1 rounded-full bg-slate-300" /> 
                                {apt.date}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-end gap-2 w-full sm:w-auto">
                            <div className="mr-4 text-sm font-medium hidden sm:block">{CURRENCY}{apt.price}</div>
                            
                            <Link href={`/providers/${apt.providerId}/book?service=${apt.id}`}>
                              <Button size="sm" variant="outline" className="h-8 text-xs border-primary/20 hover:bg-primary/5 hover:text-primary hover:border-primary/50 transition-colors">
                                <Plus className="h-3 w-3 mr-1" /> Rebook
                              </Button>
                            </Link>
                            
                            <Button size="sm" variant="ghost" className="h-8 text-xs text-muted-foreground hover:text-yellow-600 hover:bg-yellow-50">
                              <Star className="h-3 w-3 mr-1" /> Rate
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-muted-foreground text-sm">
                        No completed bookings yet.
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-2 bg-muted/20">
                  <Button variant="ghost" className="w-full text-xs text-muted-foreground h-8">
                    View full history
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* Sidebar: Recommendations / Past Activity */}
          <div className="space-y-6">
             <Card className="bg-primary text-primary-foreground border-none shadow-lg relative overflow-hidden">
               <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
               <CardHeader>
                 <CardTitle className="text-lg">Pro Tip</CardTitle>
               </CardHeader>
               <CardContent>
                 <p className="text-sm text-primary-foreground/90">
                   Did you know? Booking 3 days in advance increases your chance of getting your preferred slot by 80%.
                 </p>
               </CardContent>
               <CardFooter>
                 <Button variant="secondary" size="sm" className="w-full font-semibold text-primary">
                   Explore Availability
                 </Button>
               </CardFooter>
             </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
