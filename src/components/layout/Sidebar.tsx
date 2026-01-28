"use client"

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  LogOut,
  LayoutDashboard,
  Users,
  Settings,
  Briefcase,
  Clock,
  ShieldAlert,
  BarChart,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { PROVIDER_LINKS, ADMIN_LINKS, APP_NAME } from "@/constants";

interface SidebarProps {
  role: "provider" | "admin";
}

export function Sidebar({ role }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const links = role === "provider" ? PROVIDER_LINKS : ADMIN_LINKS;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "LayoutDashboard": return LayoutDashboard;
      case "Calendar": return Calendar;
      case "Users": return Users;
      case "Settings": return Settings;
      case "Briefcase": return Briefcase;
      case "Clock": return Clock;
      case "ShieldAlert": return ShieldAlert;
      case "BarChart": return BarChart;
      case "LogOut": return LogOut;
      default: return Calendar;
    }
  };

  return (
    <div 
      className={cn(
        "relative flex h-full min-h-screen flex-col border-r bg-muted/10 transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 mb-4 border-b bg-background/50">
        <Link href="/" className={cn("text-xl font-bold tracking-tight flex items-center gap-2 overflow-hidden whitespace-nowrap", collapsed && "justify-center")}>
          <Calendar className="h-6 w-6 text-primary flex-shrink-0" />
          <span className={cn("transition-opacity duration-200", collapsed ? "opacity-0 w-0" : "opacity-100")}>{APP_NAME}</span>
        </Link>
        <Button 
           variant="ghost" 
           size="icon" 
           className={cn("h-6 w-6 rounded-full absolute -right-3 top-5 bg-background border shadow-sm z-10 hidden md:flex")}
           onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </Button>
      </div>
      
      <div className="flex-1 space-y-1 px-2">
        {links.map((link) => {
          const Icon = getIcon(link.icon);
          const isActive = pathname === link.href;
          
          return (
            <Link key={link.href} href={link.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 transition-all",
                  isActive && "bg-secondary text-secondary-foreground font-medium",
                  collapsed ? "justify-center px-0" : "px-3"
                )}
                title={link.label}
              >
                <Icon className={cn("h-5 w-5 flex-shrink-0", isActive ? "text-primary" : "text-muted-foreground")} />
                <span className={cn("transition-all duration-200 overflow-hidden whitespace-nowrap", collapsed ? "w-0 opacity-0" : "w-auto opacity-100")}>
                  {link.label}
                </span>
              </Button>
            </Link>
          );
        })}
      </div>

      <div className="mt-auto border-t p-2">
        <Link href="/">
          <Button 
             variant="ghost" 
             className={cn(
               "w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10",
               collapsed ? "justify-center px-0" : "px-3"
             )}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            <span className={cn("transition-all duration-200 overflow-hidden whitespace-nowrap", collapsed ? "w-0 opacity-0" : "w-auto opacity-100")}>
              Log Out
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
