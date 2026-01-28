"use client"

import Link from "next/link";
// import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_NAME } from "@/constants";
import { Calendar, Shield, Users, Briefcase, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Mail, Github, Chrome } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const router = useRouter();

  const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
      resolver: zodResolver(loginSchema),
    });

  const { login, user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && user) {
      toast.info("You are already logged in");
      router.push("/dashboard");
    }
  }, [user, isLoading, router]);
  
  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await axios.post("/api/auth/login", data);
      console.log("Login success:", response.data);
      toast.success("Login successful! Redirecting...");
      
      const { token, user } = response.data;
      login(token, user);
      
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data?.error || "Invalid email or password";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: "url('/auth_background.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

          <div className="relative z-20 flex items-center text-lg font-medium">
            <Shield className="mr-2 h-6 w-6" />
            {APP_NAME}
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Managing my appointments has never been easier. This platform saves me hours every week.&rdquo;
              </p>
              <footer className="text-sm">Sarah Jim, Wellness Provider</footer>
            </blockquote>
          </div>
        </div>
        
        <div className="relative lg:p-8 h-full flex flex-col justify-center">
          <div className="absolute top-4 left-4 md:top-8 md:left-8">
            <Button variant="ghost" asChild>
              <Link href="/">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
          </div>

          <div className="absolute top-4 right-4 md:top-8 md:right-8">
             <Button variant="ghost" asChild>
              <Link href="/register">
                Register
              </Link>
            </Button>
          </div>

          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
              <p className="text-sm text-muted-foreground">Enter your credentials to sign in.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
               <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input className="pl-9" type="email" placeholder="m@example.com" {...register("email")} />
                  </div>
                  {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
               </div>
               
               <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Password</label>
                    <Link
                      href="/forgot-password"
                      className="text-xs text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <PasswordInput {...register("password")} />
                  {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
               </div>

               <Button className="w-full mt-2" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Logging in..." : "Login"}
               </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" type="button" disabled={isSubmitting}>
                <Chrome className="mr-2 h-4 w-4" />
                Google
              </Button>
              <Button variant="outline" type="button" disabled={isSubmitting}>
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </div>

            <p className="px-8 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="underline underline-offset-4 hover:text-primary">
                Sign up
              </Link>
            </p>
            
            <p className="mt-4 text-center text-xs text-muted-foreground">
               <Link href="/demo" className="hover:text-primary transition-colors">
                 Try Demo Access (No Account Needed)
               </Link>
            </p>

          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
