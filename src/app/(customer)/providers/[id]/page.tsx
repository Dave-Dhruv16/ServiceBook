import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MOCK_PROVIDERS, MOCK_SERVICES, CURRENCY } from "@/constants";
import { Star, MapPin, Clock, Calendar, CheckCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Next.js 15+ page params type handling
// params is now a Promise in dynamic routes in recent Next.js versions (15+), 
// but since I am using version 14 based on prompts usually, I will stick to standard params.
// Actually package.json said Next 16.1.5, so params IS a Promise.

export default async function ProviderProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const provider = MOCK_PROVIDERS.find((p) => p.id === id);
  const services = MOCK_SERVICES.filter((s) => s.providerId === id);

  if (!provider) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/20 pt-20">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column: Profile Info */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <img 
                    src={provider.image} 
                    alt={provider.name} 
                    className="h-32 w-32 rounded-full object-cover border-4 border-muted"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h1 className="text-3xl font-bold">{provider.name}</h1>
                        <p className="text-xl text-primary font-medium mt-1">{provider.profession}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-bold">
                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        {provider.rating} ({provider.reviewCount} reviews)
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-2 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {provider.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {provider.availability}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                         Member since {provider.joinedDate}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Services</CardTitle>
                <CardDescription>Select a service to book</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 {services.length > 0 ? services.map(service => (
                   <div key={service.id} className="flex justify-between items-center p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                      <div>
                         <h3 className="font-semibold">{service.name}</h3>
                         <p className="text-sm text-muted-foreground">{service.duration} mins • {service.description}</p>
                      </div>
                      <div className="flex items-center gap-4">
                         <div className="font-bold">{CURRENCY}{service.price}</div>
                         <Link href={`/providers/${provider.id}/book?service=${service.id}`}>
                           <Button size="sm">Book</Button>
                         </Link>
                      </div>
                   </div>
                 )) : (
                   <p className="text-muted-foreground">No specific services listed. You can book a general appointment.</p>
                 )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {provider.name} is a highly experienced {provider.profession} dedicated to providing top-quality service. 
                  With verified reviews and a commitment to excellence, you can trust them with your needs.
                </p>
                
                <div className="mt-6">
                  <h3 className="font-semibold mb-3">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Consultation", "Emergency", "Follow-up", "Standard Service"].map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Reviews</CardTitle>
                <CardDescription>What others are saying</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 {/* Mock Reviews */}
                 {[1, 2].map((i) => (
                   <div key={i} className="border-b last:border-0 pb-4 last:pb-0">
                     <div className="flex items-center justify-between mb-2">
                       <span className="font-medium">Happy Customer</span>
                       <div className="flex">
                         {[...Array(5)].map((_, j) => (
                           <Star key={j} className="h-3 w-3 fill-primary text-primary" />
                         ))}
                       </div>
                     </div>
                     <p className="text-sm text-muted-foreground">
                       Great experience! Very professional and timely. Would definitely recommend to anyone looking for a {provider.profession}.
                     </p>
                   </div>
                 ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Quick Action (Reduced since services are listed) */}
          <div className="md:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Quick Book</CardTitle>
                <CardDescription>Book a general service with {provider.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 border rounded-lg bg-muted/30">
                  <span className="text-muted-foreground">Starting at</span>
                  <span className="text-xl font-bold">{CURRENCY}{provider.price}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Instant confirmation
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Free cancellation (24h)
                  </div>
                </div>

                <Link href={`/providers/${provider.id}/book`} className="block">
                  <Button size="lg" className="w-full">
                    Book General Service
                  </Button>
                </Link>
                
                <p className="text-xs text-center text-muted-foreground pt-2">
                  No payment required until confirmation
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
