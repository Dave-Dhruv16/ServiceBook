"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, User, LayoutDashboard, LogOut } from "lucide-react";
import { APP_NAME, NAV_LINKS, ROLES, DASHBOARD_ROUTES } from "@/constants";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const { user, logout } = useAuth();
  const isLoggedIn = !!user;
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const publicLinks = NAV_LINKS;
  const customerLinks = [
    { href: "/services", label: "Find Services" },
    { href: "/providers", label: "Find Providers" },
    { href: `${DASHBOARD_ROUTES.CUSTOMER}/appointments`, label: "My Bookings" },
  ];

  const activeLinks = (() => {
    if (!isLoggedIn || !user) return publicLinks;
    switch (user.role) {
      case ROLES.ADMIN:
        return [
          { href: DASHBOARD_ROUTES.ADMIN, label: "Overview" },
          { href: `${DASHBOARD_ROUTES.ADMIN}/users`, label: "Users" },
          { href: `${DASHBOARD_ROUTES.ADMIN}/providers`, label: "Providers" },
        ];
      case ROLES.PROVIDER:
        return [
          { href: DASHBOARD_ROUTES.PROVIDER, label: "Overview" },
          { href: `${DASHBOARD_ROUTES.PROVIDER}/appointments`, label: "My Schedule" },
          { href: `${DASHBOARD_ROUTES.PROVIDER}/services`, label: "Services" },
        ];
      case ROLES.CUSTOMER:
      default:
        return customerLinks;
    }
  })();

  const isHome = pathname === "/";

  const getDashboardPath = () => {
    if (!user) return "/";
    switch (user.role) {
      case ROLES.ADMIN: return DASHBOARD_ROUTES.ADMIN;
      case ROLES.PROVIDER: return DASHBOARD_ROUTES.PROVIDER;
      case ROLES.CUSTOMER: default: return DASHBOARD_ROUTES.CUSTOMER;
    }
  };

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300 border-b",
      scrolled || !isHome 
        ? "bg-background/95 backdrop-blur-md shadow-sm" 
        : "bg-transparent border-transparent"
    )}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Calendar className={cn("h-6 w-6", scrolled || !isHome ? "text-primary" : "text-primary/90")} />
          <Link href={isLoggedIn ? getDashboardPath() : "/"} className={cn("text-xl font-bold tracking-tight", scrolled || !isHome ? "text-foreground" : "text-foreground/90")}>
            {APP_NAME}
          </Link>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          {activeLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === link.href 
                  ? "text-primary" 
                  : (scrolled || !isHome ? "text-muted-foreground" : "text-muted-foreground/90")
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
             <div className="flex items-center gap-2">
               <Link href={getDashboardPath()}>
                  <Button variant="ghost" size="sm" className="hidden sm:flex">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
               </Link>
               <Link href={`${getDashboardPath()}/profile`}>
                 <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                 </Button>
               </Link>
               <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={logout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Log Out
               </Button>
             </div>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">Log in</Button>
              </Link>
              <Link href="/register?role=provider">
                <Button variant="outline" size="sm" className="hidden sm:flex">Become a Provider</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
