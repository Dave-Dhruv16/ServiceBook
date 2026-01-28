import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Calendar, UserCheck, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import { APP_NAME } from "@/constants";

export default function HowItWorksPage() {
  const steps = [
    {
      title: "1. Search Providers",
      description: "Browse our extensive list of verified professionals by category, price, or rating. Filter to find the perfect match for your needs.",
      icon: Search
    },
    {
      title: "2. Choose a Slot",
      description: "View real-time availability on their profile. Select a date and time that fits your schedule perfectly.",
      icon: Calendar
    },
    {
      title: "3. Book Instantly",
      description: "Confirm your appointment with a single click. No phone calls, no waiting. You'll receive an instant confirmation.",
      icon: UserCheck
    },
    {
      title: "4. Rate & Review",
      description: "After your service, leave feedback to help the community. High-rated providers rise to the top!",
      icon: Star
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background pt-20">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 text-center bg-muted/30">
          <div className="container mx-auto max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-700">
             <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                How <span className="text-primary">{APP_NAME}</span> Works
             </h1>
             <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                We&apos;ve simplified the booking process so you can focus on what matters. 
                Connect with top-tier professionals in just four easy steps.
             </p>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-20 px-4 container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-border -z-10 transform translate-y-4" />

            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div 
                   key={index} 
                   className="relative flex flex-col items-center text-center space-y-4 group animate-in fade-in slide-in-from-bottom-8 duration-700" 
                   style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'both' }}
                >
                  <div className="relative">
                     <div className="h-16 w-16 bg-background border-2 border-primary rounded-full flex items-center justify-center shadow-sm z-10 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md">
                       <Icon className="h-7 w-7 text-primary" />
                     </div>
                     {/* Mobile Line */}
                     {index !== steps.length - 1 && (
                        <div className="lg:hidden absolute top-16 left-1/2 w-0.5 h-12 bg-border -translate-x-1/2" />
                     )}
                  </div>
                  
                  <div className="space-y-2 pt-4">
                     <h3 className="text-xl font-bold">{step.title}</h3>
                     <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                        {step.description}
                     </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary/5 border-t">
           <div className="container mx-auto px-4 text-center space-y-8 animate-in fade-in duration-1000">
              <h2 className="text-3xl font-bold">Ready to get started?</h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                 Join thousands of satisfied users who have streamlined their appointments with ServiceBook.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <Link href="/services">
                    <Button size="lg" className="rounded-full px-8 text-lg h-12 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                       Browse Services <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                 </Link>
                 <Link href="/register?role=provider">
                    <Button variant="outline" size="lg" className="rounded-full px-8 text-lg h-12 hover:bg-background">
                       Become a Provider
                    </Button>
                 </Link>
              </div>
           </div>
        </section>
      </main>
    </div>
  );
}

