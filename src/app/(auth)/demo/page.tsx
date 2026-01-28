"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Briefcase, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { APP_NAME, ROLES } from "@/constants";

export default function DemoPage() {
  const { login } = useAuth();

  const handleDemoLogin = (role: string) => {
    const mockUsers = {
      CUSTOMER: {
        id: "demo_customer",
        email: "alice@example.com",
        firstName: "Alice",
        lastName: "Customer",
        role: ROLES.CUSTOMER,
      },
      PROVIDER: {
        id: "demo_provider",
        email: "bob@example.com",
        firstName: "Bob",
        lastName: "Provider",
        role: ROLES.PROVIDER,
      },
      ADMIN: {
        id: "demo_admin",
        email: "admin@example.com",
        firstName: "Carol",
        lastName: "Admin",
        role: ROLES.ADMIN,
      },
    };

    const user = mockUsers[role as keyof typeof mockUsers];
    toast.success(`Welcome back, ${user.firstName}! (Demo ${role})`);
    login(`demo-token-${role.toLowerCase()}`, user);
  };

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-1 lg:px-0">
       <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[600px] py-12">
         
         <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-3xl font-semibold tracking-tight">Demo Access</h1>
            <p className="text-muted-foreground">Select a role to experience {APP_NAME} as a different user type.</p>
         </div>

         <div className="grid gap-4 md:grid-cols-3">
            {/* Customer Card */}
            <Card className="hover:shadow-lg transition-all cursor-pointer border-blue-200/50 hover:border-blue-400 bg-blue-50/10 group" onClick={() => handleDemoLogin("CUSTOMER")}>
               <CardHeader className="text-center pb-2">
                  <div className="mx-auto w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                     <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-base">Customer</CardTitle>
                  <CardDescription className="text-xs">Browse & book services</CardDescription>
               </CardHeader>
               <CardContent className="text-center pb-6">
                  <Button variant="ghost" className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-100">
                     Login <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
               </CardContent>
            </Card>

            {/* Provider Card */}
            <Card className="hover:shadow-lg transition-all cursor-pointer border-emerald-200/50 hover:border-emerald-400 bg-emerald-50/10 group" onClick={() => handleDemoLogin("PROVIDER")}>
               <CardHeader className="text-center pb-2">
                  <div className="mx-auto w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                     <Briefcase className="w-6 h-6 text-emerald-600" />
                  </div>
                  <CardTitle className="text-base">Provider</CardTitle>
                  <CardDescription className="text-xs">Manage appointments</CardDescription>
               </CardHeader>
               <CardContent className="text-center pb-6">
                  <Button variant="ghost" className="w-full text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100">
                     Login <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
               </CardContent>
            </Card>

            {/* Admin Card */}
            <Card className="hover:shadow-lg transition-all cursor-pointer border-purple-200/50 hover:border-purple-400 bg-purple-50/10 group" onClick={() => handleDemoLogin("ADMIN")}>
               <CardHeader className="text-center pb-2">
                  <div className="mx-auto w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                     <ShieldCheck className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-base">Admin</CardTitle>
                  <CardDescription className="text-xs">System oversight</CardDescription>
               </CardHeader>
               <CardContent className="text-center pb-6">
                  <Button variant="ghost" className="w-full text-purple-600 hover:text-purple-700 hover:bg-purple-100">
                     Login <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
               </CardContent>
            </Card>
         </div>

         <div className="text-center">
            <Link href="/login">
               <Button variant="link" className="text-muted-foreground">
                  Back to regular login
               </Button>
            </Link>
         </div>

       </div>
    </div>
  );
}
