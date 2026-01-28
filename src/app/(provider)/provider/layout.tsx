import { Sidebar } from "@/components/layout/Sidebar";

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-muted/20">
      <div className="hidden md:block">
        <Sidebar role="provider" />
      </div>
      <div className="flex-1 flex flex-col overflow-auto">
        <header className="h-14 border-b bg-background flex items-center px-6 sticky top-0 z-10">
          <h2 className="font-semibold">Provider Portal</h2>
        </header>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
