"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { APP_NAME } from "@/constants";
import { Calendar, ChevronLeft } from "lucide-react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";


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

  const searchParams = useSearchParams();
  const role = searchParams.get("role");

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      // TODO: Integrate with actual registration API
      console.log("Register data:", data);
      // await axios.post('/api/auth/register', data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/"
          className="absolute left-4 top-4 md:left-8 md:top-8 z-50 flex items-center text-sm font-medium text-muted-foreground hover:text-primary lg:text-white lg:hover:text-white/80"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back
        </Link>
        <Link
          href="/login"
          className="absolute right-4 top-4 md:right-8 md:top-8 z-50 text-sm font-medium hover:underline text-primary"
        >
          Login
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
                &ldquo;I found the perfect plumber in minutes. The booking process was seamless and the service was excellent.&rdquo;
              </p>
              <footer className="text-sm">Alex Chen, Homeowner</footer>
            </blockquote>
          </div>
        </div>

        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
              <p className="text-sm text-muted-foreground">Enter your details to get started.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                     <label className="text-sm font-medium">First Name</label>
                     <Input placeholder="John" {...register("firstName")} />
                     {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
                  </div>
                  <div className="space-y-2">
                     <label className="text-sm font-medium">Last Name</label>
                     <Input placeholder="Doe" {...register("lastName")} />
                     {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
                  </div>
               </div>
               
               <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="m@example.com" {...register("email")} />
                  {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
               </div>
               
               <div className="space-y-2">
                  <label className="text-sm font-medium">Password</label>
                  <Input type="password" {...register("password")} />
                  {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
               </div>

               <Button className="w-full mt-2" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Account"}
               </Button>
            </form>

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
