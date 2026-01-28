"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ROLES, DASHBOARD_ROUTES } from "@/constants";

export default function ProtectedRoute({ 
  children, 
  allowedRoles = [] 
}: { 
  children: React.ReactNode;
  allowedRoles?: string[];
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/login");
      } else if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        // Redirect to their allowed dashboard if they try to access unauthorized route
        if (user.role === ROLES.ADMIN) router.push(DASHBOARD_ROUTES.ADMIN);
        else if (user.role === ROLES.PROVIDER) router.push(DASHBOARD_ROUTES.PROVIDER);
        else router.push(DASHBOARD_ROUTES.CUSTOMER);
      }
    }
  }, [user, isLoading, router, allowedRoles]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect via useEffect
  }

  return <>{children}</>;
}
