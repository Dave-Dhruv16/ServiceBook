import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Star } from "lucide-react";
import { MOCK_PROVIDERS, CURRENCY } from "@/constants";
import Link from "next/link";

export default function ProvidersPage() {
  return (
    <div className="min-h-screen flex flex-col bg-muted/20 pt-20">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
           {/* Sticky Sidebar Filters */}
           <aside className="hidden lg:block w-64 flex-shrink-0">
             <div className="sticky top-24 space-y-6">
                <Card>
                   <CardHeader>
                      <CardTitle className="text-lg">Filters</CardTitle>
                   </CardHeader>
                   <CardContent className="space-y-4">
                      <div className="space-y-2">
                         <label className="text-sm font-medium">Profession</label>
                         <div className="space-y-1">
                            {["Dermatologist", "Barber", "Nutritionist", "Consultant"].map(cat => (
                               <div key={cat} className="flex items-center gap-2">
                                  <input type="checkbox" id={cat} className="rounded border-gray-300" />
                                  <label htmlFor={cat} className="text-sm text-muted-foreground">{cat}</label>
                               </div>
                            ))}
                         </div>
                      </div>
                      
                      <div className="space-y-2">
                         <label className="text-sm font-medium">Rating</label>
                         <div className="space-y-1">
                            {[4, 3, 2].map(rating => (
                               <div key={rating} className="flex items-center gap-2">
                                  <input type="checkbox" id={`r${rating}`} className="rounded border-gray-300" />
                                  <label htmlFor={`r${rating}`} className="text-sm text-muted-foreground flex items-center">
                                     {rating}+ <Star className="h-3 w-3 ml-1 fill-yellow-500 text-yellow-500" />
                                  </label>
                               </div>
                            ))}
                         </div>
                      </div>
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
                   <h1 className="text-3xl font-bold tracking-tight">Find Professionals</h1>
                   <p className="text-muted-foreground mt-1">Found {MOCK_PROVIDERS.length} providers near you.</p>
                </div>
                
                <div className="relative w-full md:w-80">
                   <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                   <Input 
                      type="search" 
                      placeholder="Search by name or profession..." 
                      className="pl-8 bg-background"
                   />
                </div>
             </div>

             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_PROVIDERS.map((provider) => (
                   <Card key={provider.id} className="overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1 group">
                      <div className="h-48 bg-secondary/50 flex items-center justify-center relative">
                         <Link href={`/providers/${provider.id}`} className="absolute inset-0 flex items-center justify-center">
                            <img 
                               src={provider.image} 
                               alt={provider.name} 
                               className="h-32 w-32 rounded-full border-4 border-background object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                         </Link>
                      </div>
                      
                      <CardHeader className="pb-2">
                         <div className="flex justify-between items-start">
                            <div>
                               <Link href={`/providers/${provider.id}`} className="hover:underline">
                                  <CardTitle className="text-xl group-hover:text-primary transition-colors">{provider.name}</CardTitle>
                               </Link>
                               <p className="text-sm font-medium text-primary mt-1">{provider.profession}</p>
                            </div>
                            <div className="flex items-center bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-bold">
                               <Star className="h-3 w-3 mr-1 fill-yellow-500 text-yellow-500" />
                               {provider.rating}
                            </div>
                         </div>
                      </CardHeader>
                      
                      <CardContent className="pb-4">
                         <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            {provider.location}
                         </div>
                         <div className="text-sm">
                            <span className="font-semibold">{CURRENCY}{provider.price}</span> / session
                         </div>
                      </CardContent>
                      
                      <CardFooter className="bg-muted/50 pt-4">
                         <Link href={`/providers/${provider.id}/book`} className="w-full">
                            <Button className="w-full">Book Service</Button>
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
