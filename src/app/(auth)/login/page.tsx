"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_NAME } from "@/constants";
import { Calendar, Shield, Users, Briefcase, ChevronLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();

  const handleMockLogin = (role: string) => {
    switch (role) {
      case "customer":
        router.push("/dashboard");
        break;
      case "provider":
        router.push("/provider");
        break;
      case "admin":
        router.push("/admin");
        break;
    }
  };

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/"
        className="absolute left-4 top-4 md:left-8 md:top-8 z-50 flex items-center text-sm font-medium text-muted-foreground hover:text-primary lg:text-white lg:hover:text-white/80"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back
      </Link>
      <Link
        href="/register"
        className="absolute right-4 top-4 md:right-8 md:top-8 z-50 text-sm font-medium hover:underline text-primary"
      >
        Register
      </Link>
      
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-primary/90" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Calendar className="mr-2 h-6 w-6" />
          {APP_NAME}
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This platform has completely transformed how I manage my salon bookings. It saves me at least 10 hours a week!&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis, Professional Stylist</footer>
          </blockquote>
        </div>
      </div>

      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Login to your account</h1>
            <p className="text-sm text-muted-foreground">Select your role to continue (Mock Auth)</p>
          </div>

          <div className="grid gap-4">
             <Button 
              variant="outline" 
              className="h-auto py-5 relative flex items-center justify-start gap-4 hover:border-primary hover:bg-primary/5 transition-all text-left group"
              onClick={() => handleMockLogin("customer")}
            >
               <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                  <Users className="h-5 w-5 text-blue-600 group-hover:text-primary" />
               </div>
              <div className="flex-1">
                <span className="font-semibold block text-base group-hover:text-primary transition-colors">Customer</span>
                <span className="text-xs text-muted-foreground">Book services & manage profile</span>
              </div>
            </Button>

            <Button 
               variant="outline" 
               className="h-auto py-5 relative flex items-center justify-start gap-4 hover:border-primary hover:bg-primary/5 transition-all text-left group"
               onClick={() => handleMockLogin("provider")}
            >
               <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                  <Briefcase className="h-5 w-5 text-purple-600 group-hover:text-primary" />
               </div>
               <div className="flex-1">
                 <span className="font-semibold block text-base group-hover:text-primary transition-colors">Service Provider</span>
                 <span className="text-xs text-muted-foreground">Manage services & bookings</span>
               </div>
            </Button>

             <Button 
               variant="outline" 
               className="h-auto py-5 relative flex items-center justify-start gap-4 hover:border-primary hover:bg-primary/5 transition-all text-left group"
               onClick={() => handleMockLogin("admin")}
            >
               <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                  <Shield className="h-5 w-5 text-slate-600 group-hover:text-primary" />
               </div>
               <div className="flex-1">
                 <span className="font-semibold block text-base group-hover:text-primary transition-colors">Administrator</span>
                 <span className="text-xs text-muted-foreground">System overview & user management</span>
               </div>
            </Button>
          </div>

          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
