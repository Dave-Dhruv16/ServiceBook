import { Navbar } from "@/components/layout/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Navbar isLoggedIn={true} />
      <div className="container mx-auto px-4 py-8 flex-1 pt-20">
        {children}
      </div>
    </div>
  );
}
