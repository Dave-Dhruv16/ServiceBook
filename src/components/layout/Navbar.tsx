"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, User, LayoutDashboard, LogOut } from "lucide-react";
import { APP_NAME, NAV_LINKS } from "@/constants";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface NavbarProps {
  isLoggedIn?: boolean;
}

export function Navbar({ isLoggedIn = false }: NavbarProps) {
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
    { href: "/dashboard/appointments", label: "My Bookings" },
  ];

  const activeLinks = isLoggedIn ? customerLinks : publicLinks;

  const isHome = pathname === "/";

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
          <Link href={isLoggedIn ? "/dashboard" : "/"} className={cn("text-xl font-bold tracking-tight", scrolled || !isHome ? "text-foreground" : "text-foreground/90")}>
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
               <Link href="/dashboard/profile">
                 <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                 </Button>
               </Link>
               <Link href="/">
                 <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <LogOut className="h-4 w-4 mr-2" />
                    Log Out
                 </Button>
               </Link>
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
