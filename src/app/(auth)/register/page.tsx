"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { APP_NAME } from "@/constants";
import { Calendar, ChevronLeft } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import { PasswordInput } from "@/components/ui/password-input";
import { Mail, User, Github, Chrome } from "lucide-react";
import { useAuth } from "@/context/AuthContext";


const registerSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterContent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const { login, user, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role");

  useEffect(() => {
    if (!isLoading && user) {
      toast.info("You are already logged in");
      router.push("/dashboard");
    }
  }, [user, isLoading, router]);

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const response = await axios.post("/api/auth/register", {
        ...data,
        role: role || "CUSTOMER", 
      });
      console.log("Registered successfully:", response.data);
      toast.success("Account created successfully! Logging in...");
      
      const { token, user } = response.data;
      login(token, user);
      
    } catch (error: any) {
      console.error("Registration failed:", error);
      const errorMessage = error.response?.data?.error || "Registration failed. Please try again.";
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
            <Calendar className="mr-2 h-6 w-6" />
            {APP_NAME}
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;I found the perfect plumber in minutes. The booking process was seamless and the service was excellent.&rdquo;
              </p>
              <footer className="text-sm">Alex Chen, Homeowner</footer>
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
              <Link href="/login">
                Login
              </Link>
            </Button>
          </div>

          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
              <p className="text-sm text-muted-foreground">Enter your details to get started.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                     <label className="text-sm font-medium">First Name</label>
                     <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-9" placeholder="John" {...register("firstName")} />
                     </div>
                     {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
                  </div>
                  <div className="space-y-2">
                     <label className="text-sm font-medium">Last Name</label>
                     <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-9" placeholder="Doe" {...register("lastName")} />
                     </div>
                     {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
                  </div>
               </div>
               
               <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input className="pl-9" type="email" placeholder="m@example.com" {...register("email")} />
                  </div>
                  {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
               </div>
               
               <div className="space-y-2">
                  <label className="text-sm font-medium">Password</label>
                  <PasswordInput {...register("password")} />
                  {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
               </div>

               <Button className="w-full mt-2" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Account"}
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
    </>
  );
};

const RegisterPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterContent />
    </Suspense>
  );
};

export default RegisterPage;
