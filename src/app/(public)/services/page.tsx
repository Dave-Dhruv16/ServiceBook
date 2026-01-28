import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Clock, Tag, SlidersHorizontal } from "lucide-react";
import { MOCK_SERVICES, CURRENCY } from "@/constants";
import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";

const FiltersContent = () => (
  <div className="space-y-6">
    <div className="space-y-2">
       <label className="text-sm font-medium">Category</label>
       <div className="space-y-1">
          {["Medical", "Salon", "Health", "Consulting"].map(cat => (
             <div key={cat} className="flex items-center gap-2">
                <input type="checkbox" id={`mobile-${cat}`} className="rounded border-gray-300" />
                <label htmlFor={`mobile-${cat}`} className="text-sm text-muted-foreground">{cat}</label>
             </div>
          ))}
       </div>
    </div>
    
    <div className="space-y-2">
       <label className="text-sm font-medium">Price Range</label>
       <div className="flex items-center gap-2">
          <Input placeholder="Min" className="h-8 text-xs" />
          <span>-</span>
          <Input placeholder="Max" className="h-8 text-xs" />
       </div>
    </div>
  </div>
);

export default function ServicesPage() {

  return (
    <div className="min-h-screen flex flex-col bg-muted/20 pt-20">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sticky Sidebar Filters (Desktop) */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
             <div className="sticky top-24 space-y-6">
                <Card>
                   <CardHeader>
                      <CardTitle className="text-lg">Filters</CardTitle>
                   </CardHeader>
                   <CardContent className="space-y-4">
                      <FiltersContent />
                   </CardContent>
                   <CardFooter>
                      <Button className="w-full" size="sm">Apply Filters</Button>
                   </CardFooter>
                </Card>
             </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Browse Services</h1>
                <p className="text-muted-foreground mt-1">Found {MOCK_SERVICES.length} services for you.</p>
              </div>
              
              <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="relative flex-1 md:w-80">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="search" 
                    placeholder="Search services..." 
                    className="pl-8 bg-background"
                  />
                </div>
                
                {/* Mobile Filter Trigger */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="lg:hidden shrink-0">
                      <SlidersHorizontal className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="py-6">
                      <FiltersContent />
                    </div>
                    <SheetFooter>
                      <Button className="w-full">Apply Filters</Button>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_SERVICES.map((service) => (
                <Card key={service.id} className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1 group">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1 flex items-center gap-1">
                           <Tag className="h-3 w-3" /> {service.category}
                        </div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">{service.name}</CardTitle>
                      </div>
                      <div className="font-bold text-lg bg-primary/5 px-2 py-1 rounded text-primary">
                        {CURRENCY}{service.price}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pb-4 space-y-3">
                     <p className="text-sm text-muted-foreground line-clamp-2">
                       {service.description}
                     </p>
                     <div className="flex items-center justify-between text-sm">
                       <div className="flex items-center text-muted-foreground">
                         <Clock className="h-4 w-4 mr-1" />
                         {service.duration} mins
                       </div>
                       <div className="font-medium text-xs bg-secondary px-2 py-1 rounded-full">
                         By {service.providerName}
                       </div>
                     </div>
                  </CardContent>
                  
                  <CardFooter className="bg-muted/30 pt-4">
                    <Link href={`/providers/${service.providerId}/book?service=${service.id}`} className="w-full">
                      <Button variant="outline" className="w-full group-hover:border-primary group-hover:text-primary transition-colors">View Details</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
