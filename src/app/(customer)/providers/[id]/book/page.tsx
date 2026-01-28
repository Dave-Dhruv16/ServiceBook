import { Navbar } from "@/components/layout/Navbar";
import { MOCK_PROVIDERS } from "@/constants";
import { notFound } from "next/navigation";
import { BookingWizard } from "@/components/booking/BookingWizard";

export default async function BookingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const provider = MOCK_PROVIDERS.find((p) => p.id === id);

  if (!provider) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/20 pt-20">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Complete Your Booking</h1>
        <BookingWizard provider={provider} />
      </main>
    </div>
  );
}
