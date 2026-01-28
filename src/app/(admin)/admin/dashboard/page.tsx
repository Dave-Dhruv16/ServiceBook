"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Users, Briefcase, Calendar, AlertTriangle, ArrowRight, Settings, ShieldAlert } from "lucide-react";
import { ROLES, MOCK_PROVIDERS, MOCK_APPOINTMENTS, CURRENCY } from "@/constants";
import { Button } from "@/components/ui/button";
import ProtectedRoute from "@/components/auth/protected-route";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function AdminDashboardPage() {
  const { user } = useAuth();
  
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
    <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              {greeting}, {user?.firstName || "Admin"}!
            </h1>
            <p className="text-muted-foreground mt-1">
              System overview and health check.
            </p>
          </div>
          <div className="flex gap-2">
             <Link href="/admin/dashboard/settings">
              <Button variant="outline" className="shadow-sm">
                <Settings className="mr-2 h-4 w-4" /> Settings
              </Button>
             </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Total Users", icon: Users, value: "1,234", sub: "+180 this month", color: "text-blue-500", bg: "bg-blue-500/10" },
            { title: "Active Providers", icon: Briefcase, value: MOCK_PROVIDERS.length.toString(), sub: "+2 new applications", color: "text-emerald-500", bg: "bg-emerald-500/10" },
            { title: "Total Bookings", icon: Calendar, value: MOCK_APPOINTMENTS.length.toString(), sub: "+12% from last month", color: "text-purple-500", bg: "bg-purple-500/10" },
            { title: "System Alerts", icon: AlertTriangle, value: "3", sub: "Requires attention", color: "text-red-500", bg: "bg-red-500/10" }
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
                   <p className="text-xs text-muted-foreground mt-1">{stat.sub}</p>
                 </div>
                 <div className={`h-12 w-12 rounded-full flex items-center justify-center ${stat.bg}`}>
                   <stat.icon className={`h-6 w-6 ${stat.color}`} />
                 </div>
               </CardContent>
             </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
               <h2 className="text-xl font-semibold tracking-tight">Recent Registrations</h2>
               <Link href="/admin/dashboard/users" className="text-sm text-primary hover:underline flex items-center">
                 View all users <ArrowRight className="ml-1 h-3 w-3" />
               </Link>
            </div>
            
            <Card className="border-none shadow-sm">
                <CardContent className="p-0">
                  <div className="divide-y">
                     {MOCK_PROVIDERS.slice(0, 4).map((provider) => (
                        <div key={provider.id} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
                           <div className="flex items-center gap-4">
                              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                                 {/* Using a generic icon if image fails, but mock has images */}
                                 {/* eslint-disable-next-line @next/next/no-img-element */}
                                 <img src={provider.image} alt={provider.name} className="h-full w-full object-cover" />
                              </div>
                              <div>
                                 <p className="font-medium text-sm">{provider.name}</p>
                                 <p className="text-xs text-muted-foreground">{provider.profession} • {provider.location}</p>
                              </div>
                           </div>
                           <div className="flex items-center gap-2">
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Approved</span>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                 <ArrowRight className="h-4 w-4 text-muted-foreground" />
                              </Button>
                           </div>
                        </div>
                     ))}
                  </div>
                </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
             <Card className="border-l-4 border-l-red-500 shadow-sm">
                <CardHeader>
                   <CardTitle className="text-lg flex items-center gap-2">
                      <ShieldAlert className="h-5 w-5 text-red-500" />
                      Pending Actions
                   </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="flex items-center justify-between text-sm">
                      <span>Provider Applications</span>
                      <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs font-bold">4</span>
                   </div>
                   <div className="flex items-center justify-between text-sm">
                      <span>Reported Reviews</span>
                      <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-xs font-bold">2</span>
                   </div>
                   <Button className="w-full mt-2" variant="outline">Review All</Button>
                </CardContent>
             </Card>

             <Card className="bg-primary text-primary-foreground border-none shadow-lg">
               <CardHeader>
                 <CardTitle className="text-lg">System Health</CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                       <span>Server Load</span>
                       <span>24%</span>
                    </div>
                    <div className="h-2 w-full bg-primary-foreground/20 rounded-full overflow-hidden">
                       <div className="h-full bg-green-400 w-[24%]" />
                    </div>
                    <p className="text-xs text-primary-foreground/80 pt-2">All systems operational.</p>
                 </div>
               </CardContent>
             </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
