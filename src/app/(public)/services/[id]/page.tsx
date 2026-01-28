import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MOCK_SERVICES, CURRENCY } from "@/constants";
import { Clock, CheckCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = MOCK_SERVICES.find((s) => s.id === id);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/20 pt-20">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="mb-6">
           <Link href="/services" className="text-sm text-muted-foreground hover:underline flex items-center gap-1">
             &larr; Back to Services
           </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
           {/* Left Column: Service Details */}
           <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                     <div>
                       <div className="text-sm font-medium text-primary uppercase tracking-wide mb-1">
                          {service.category}
                       </div>
                       <h1 className="text-3xl font-bold">{service.name}</h1>
                       <p className="text-xl text-muted-foreground mt-1">offered by <Link href={`/providers/${service.providerId}`} className="text-primary hover:underline">{service.providerName}</Link></p>
                     </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                   <div className="flex items-center gap-4 text-sm font-medium">
                      <div className="flex items-center gap-1 bg-secondary px-3 py-1 rounded-full">
                         <Clock className="h-4 w-4 text-muted-foreground" />
                         {service.duration} mins
                      </div>
                      <div className="flex items-center gap-1 text-green-600">
                         <CheckCircle className="h-4 w-4" />
                         Instant Booking Available
                      </div>
                   </div>

                   <div className="border-t pt-6">
                     <h3 className="font-semibold mb-2">Description</h3>
                     <p className="text-muted-foreground leading-relaxed">
                       {service.description}
                     </p>
                   </div>
                </CardContent>
              </Card>

              {/* Reviews Placeholder */}
              <Card>
                 <CardHeader>
                    <CardTitle>Reviews</CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-muted-foreground italic">No reviews yet for this specific service.</p>
                 </CardContent>
              </Card>
           </div>

           {/* Right Column: Sticky Booking Card */}
           <div className="md:col-span-1">
              <Card className="sticky top-24 shadow-lg border-primary/20">
                 <CardHeader className="bg-muted/30 pb-4">
                    <CardTitle>Book This Service</CardTitle>
                    <CardDescription>Simple, secure booking.</CardDescription>
                 </CardHeader>
                 <CardContent className="space-y-6 pt-6">
                    <div className="flex justify-between items-end">
                       <span className="text-muted-foreground font-medium">Total</span>
                       <span className="text-3xl font-bold text-primary">{CURRENCY}{service.price}</span>
                    </div>

                    <div className="space-y-2">
                       <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Secure payment</span>
                       </div>
                       <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Satisfaction guarantee</span>
                       </div>
                    </div>

                    <Link href={`/providers/${service.providerId}/book?service=${service.id}`} className="block w-full">
                      <Button size="lg" className="w-full text-lg shadow-md hover:shadow-lg transition-all">Book Now</Button>
                    </Link>
                 </CardContent>
              </Card>
           </div>
        </div>
      </main>
    </div>
  );
}
