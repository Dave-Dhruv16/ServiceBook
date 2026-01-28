"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Provider, CURRENCY, MOCK_SERVICES } from "@/constants";
import { Calendar as CalendarIcon, Clock, CheckCircle, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "next/navigation";

const MOCK_SLOTS = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];

const STEPS = ["Service", "Date", "Time", "Details", "Confirm"];

export function BookingWizard({ provider }: { provider: Provider }) {
  const searchParams = useSearchParams();
  const initialServiceId = searchParams.get("service");
  
  const [currentStep, setCurrentStep] = useState(initialServiceId ? 1 : 0);
  const [direction, setDirection] = useState(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(initialServiceId || "");
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  
  // Loading states
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const services = MOCK_SERVICES.filter(s => s.providerId === provider.id);
  const selectedService = services.find(s => s.id === selectedServiceId) || { name: "General Service", price: provider.price, duration: 60 };



  const handleNext = () => {
    setDirection(1);
    
    // Simulate loading for slots when moving to Time step
    if (currentStep === 1) {
       setIsLoadingSlots(true);
       setTimeout(() => setIsLoadingSlots(false), 800);
    }
    
    setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  };

  const handleBack = () => {
    setDirection(-1);
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleConfirm = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setCurrentStep(STEPS.length); // Complete
    }, 1500);
  };

  if (isSuccess) {
    return (
      <Card className="text-center py-12 animate-in zoom-in-95 duration-500">
        <CardContent className="space-y-6">
          <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 shadow-sm animate-in bounce-in duration-1000">
            <CheckCircle className="h-12 w-12" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Booking Confirmed!</h2>
            <p className="text-muted-foreground max-w-sm mx-auto">
              Your appointment for <span className="font-semibold text-foreground">{selectedService.name}</span> with {provider.name} is scheduled.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/dashboard/appointments">
              <Button size="lg" className="w-full sm:w-auto">View My Appointments</Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">Back to Home</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
       {/* Main Wizard Area */}
       <div className="flex-1 space-y-6">
          
          {/* Progress Bar */}
          <div className="space-y-2">
             <div className="flex justify-between text-sm font-medium text-muted-foreground">
                <span>Step {currentStep + 1} of 4</span>
                <span>{STEPS[currentStep]}</span>
             </div>
             <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div 
                   className="h-full bg-primary transition-all duration-500 ease-in-out" 
                   style={{ width: `${((currentStep + 1) / 4) * 100}%` }}
                />
             </div>
          </div>

          <Card className="min-h-[400px] flex flex-col overflow-hidden">
             <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                   {currentStep === 0 && "Select a Service"}
                   {currentStep === 1 && "Choose Date"}
                   {currentStep === 2 && "Select Time"}
                   {currentStep === 3 && "Review & Confirm"}
                </CardTitle>
                <CardDescription>
                   {currentStep === 0 && "Choose the specific service you need."}
                   {currentStep === 1 && "Pick a day that works for you."}
                   {currentStep === 2 && "Available slots for the selected date."}
                   {currentStep === 3 && "Finalize your booking details."}
                </CardDescription>
             </CardHeader>
             
             <CardContent className="flex-1">
                <div className={cn(
                   "transition-all duration-300 ease-in-out", 
                   "animate-in fade-in slide-in-from-right-4"
                )}>
                   
                   {/* STEP 0: SERVICE SELECTION */}
                   {currentStep === 0 && (
                      <div className="space-y-3">
                         {services.length > 0 ? services.map(service => (
                            <div 
                               key={service.id} 
                               className={cn(
                                  "flex justify-between items-center p-4 border rounded-lg cursor-pointer transition-all hover:border-primary",
                                  selectedServiceId === service.id ? "border-primary bg-primary/5 ring-1 ring-primary" : "bg-card"
                               )}
                               onClick={() => setSelectedServiceId(service.id)}
                            >
                               <div>
                                  <div className="font-semibold">{service.name}</div>
                                  <div className="text-xs text-muted-foreground">{service.duration} mins</div>
                               </div>
                               <div className="font-bold">{CURRENCY}{service.price}</div>
                            </div>
                         )) : (
                            <div className="p-8 text-center border-dashed border-2 rounded-lg text-muted-foreground">
                               No specific services found. You can proceed with a General Consultation.
                               <Button variant="link" onClick={() => setSelectedServiceId("general")}>Select General</Button>
                            </div>
                         )}
                      </div>
                   )}

                   {/* STEP 1: DATE SELECTION */}
                   {currentStep === 1 && (
                      <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-thin">
                         {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((offset) => {
                             const date = new Date();
                             date.setDate(date.getDate() + offset);
                             const isSelected = selectedDate === offset;
                             return (
                               <Button 
                                 key={offset} 
                                 variant={isSelected ? "default" : "outline"} 
                                 className={cn(
                                    "flex flex-col h-24 w-20 flex-shrink-0 gap-1 transition-all",
                                    isSelected ? "scale-105 shadow-md" : "hover:bg-muted"
                                 )}
                                 onClick={() => setSelectedDate(offset)}
                               >
                                 <span className="text-xs uppercase opacity-80">{date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                                 <span className="text-2xl font-bold">{date.getDate()}</span>
                                 <span className="text-[10px] opacity-60">{date.toLocaleDateString('en-US', { month: 'short' })}</span>
                               </Button>
                             )
                         })}
                      </div>
                   )}

                   {/* STEP 2: TIME SELECTION */}
                   {currentStep === 2 && (
                      isLoadingSlots ? (
                         <div className="grid grid-cols-3 gap-3">
                            {[1,2,3,4,5,6].map(i => <Skeleton key={i} className="h-10 w-full" />)}
                         </div>
                      ) : (
                         <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                            {MOCK_SLOTS.map((slot) => (
                               <Button 
                                 key={slot} 
                                 variant={selectedTime === slot ? "default" : "outline"} 
                                 className={cn(
                                    "text-sm transition-all",
                                    selectedTime === slot && "ring-2 ring-primary ring-offset-2 scale-105"
                                 )}
                                 onClick={() => setSelectedTime(slot)}
                               >
                                 {slot}
                               </Button>
                            ))}
                         </div>
                      )
                   )}

                   {/* STEP 3: DETAILS & PAYMENT */}
                   {currentStep === 3 && (
                      <div className="space-y-6">
                         <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                               <label className="text-sm font-medium">First Name</label>
                               <Input defaultValue="Guest" />
                            </div>
                            <div className="space-y-2">
                               <label className="text-sm font-medium">Last Name</label>
                               <Input defaultValue="User" />
                            </div>
                         </div>
                         <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <Input defaultValue="guest@example.com" />
                         </div>
                         <div className="space-y-2">
                            <label className="text-sm font-medium">Notes (Optional)</label>
                            <Input placeholder="Any special requests?" />
                         </div>

                         {/* PAYMENT MOCK */}
                         <div className="pt-4 border-t">
                            <label className="text-sm font-medium mb-3 block">Payment Method</label>
                            <div className="grid grid-cols-2 gap-3 mb-4">
                               <div className="border rounded-lg p-3 cursor-pointer bg-primary/5 border-primary flex items-center justify-between">
                                  <span className="font-semibold text-sm">Credit Card</span>
                                  <div className="h-4 w-4 rounded-full border border-primary bg-primary" />
                               </div>
                               <div className="border rounded-lg p-3 cursor-pointer hover:bg-muted flex items-center justify-between">
                                  <span className="font-medium text-sm">UPI / Netbanking</span>
                                  <div className="h-4 w-4 rounded-full border border-muted-foreground" />
                               </div>
                            </div>
                            
                            <div className="space-y-3 bg-muted/20 p-4 rounded-lg">
                               <div className="space-y-2">
                                  <label className="text-xs font-medium">Card Number</label>
                                  <Input placeholder="0000 0000 0000 0000" className="bg-background font-mono h-9" />
                               </div>
                               <div className="grid grid-cols-2 gap-3">
                                  <div className="space-y-2">
                                     <label className="text-xs font-medium">Expiry</label>
                                     <Input placeholder="MM/YY" className="bg-background font-mono h-9" />
                                  </div>
                                  <div className="space-y-2">
                                     <label className="text-xs font-medium">CVC</label>
                                     <Input placeholder="123" className="bg-background font-mono h-9" />
                                  </div>
                               </div>
                            </div>
                         </div>
                      </div>
                   )}

                </div>
             </CardContent>

             <CardFooter className="flex justify-between border-t bg-muted/20 p-6">
                <Button 
                   variant="ghost" 
                   onClick={handleBack} 
                   disabled={currentStep === 0 || isSubmitting}
                >
                   <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                
                {currentStep === 3 ? (
                   <Button onClick={handleConfirm} disabled={isSubmitting} size="lg" className="min-w-[140px] shadow-md hover:shadow-lg transition-all">
                      {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {isSubmitting ? "Processing..." : `Pay ${CURRENCY}${selectedService.price} & Book`}
                   </Button>
                ) : (
                   <Button 
                      onClick={handleNext} 
                      disabled={
                         (currentStep === 0 && !selectedServiceId) ||
                         (currentStep === 1 && selectedDate === null) ||
                         (currentStep === 2 && !selectedTime)
                      }
                   >
                      Next Step <ArrowRight className="ml-2 h-4 w-4" />
                   </Button>
                )}
             </CardFooter>
          </Card>
       </div>

       {/* Summary Sidebar (Desktop) */}
       <div className="hidden lg:block w-80 space-y-6">
          <Card className="sticky top-24 border-primary/20 shadow-sm">
             <CardHeader className="bg-muted/50 pb-4">
                <CardTitle className="text-lg">Booking Summary</CardTitle>
             </CardHeader>
             <CardContent className="space-y-4 pt-6">
                <div className="flex items-center gap-3 pb-4 border-b">
                   <img src={provider.image} alt={provider.name} className="h-12 w-12 rounded-full object-cover" />
                   <div>
                      <div className="font-semibold">{provider.name}</div>
                      <div className="text-xs text-muted-foreground">{provider.profession}</div>
                   </div>
                </div>

                <div className="space-y-3 text-sm">
                   <div className="flex justify-between">
                      <span className="text-muted-foreground">Service</span>
                      <span className="font-medium text-right">{selectedService.name}</span>
                   </div>
                   {selectedDate !== null && (
                      <div className="flex justify-between">
                         <span className="text-muted-foreground">Date</span>
                         <span className="font-medium">
                            {new Date(new Date().setDate(new Date().getDate() + selectedDate)).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                         </span>
                      </div>
                   )}
                   {selectedTime && (
                      <div className="flex justify-between">
                         <span className="text-muted-foreground">Time</span>
                         <span className="font-medium">{selectedTime}</span>
                      </div>
                   )}
                   <div className="border-t pt-2 flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>{CURRENCY}{selectedService.price}</span>
                   </div>
                </div>
             </CardContent>
          </Card>
       </div>
    </div>
  );
}
