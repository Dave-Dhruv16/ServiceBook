"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Calendar, 
  Briefcase, 
  Clock, 
  ShieldAlert, 
  Users, 
  BarChart, 
  Settings,
  Search,
  User,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const icons: Record<string, any> = {
  LayoutDashboard,
  Calendar,
  Briefcase,
  Clock,
  ShieldAlert,
  Users,
  BarChart,
  Settings,
  Search,
  User
};

interface SidebarLink {
  href: string;
  label: string;
  icon: string;
}

interface SidebarProps {
  links: SidebarLink[];
}

export function Sidebar({ links }: SidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className="hidden md:flex flex-col w-64 border-r bg-card h-[calc(100vh-4rem)] sticky top-16">
      <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
        {links.map((link) => {
          const Icon = icons[link.icon] || LayoutDashboard;
          const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
          
          return (
            <Link key={link.href} href={link.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 mb-1 font-normal",
                  isActive && "bg-secondary font-medium"
                )}
              >
                <Icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-muted-foreground")} />
                {link.label}
              </Button>
            </Link>
          );
        })}
      </div>
      
      <div className="p-4 border-t">
        <Button variant="outline" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground" onClick={logout}>
          <LogOut className="h-4 w-4" />
          Log Out
        </Button>
      </div>
    </aside>
  );
}
