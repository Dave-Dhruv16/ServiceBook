import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Search, Calendar, CheckCircle, Star, ArrowRight, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import { HERO_TITLE, HERO_SUBTITLE } from "@/constants";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative flex-1 flex flex-col items-center justify-center text-center px-4 py-24 md:py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-primary/5 blur-[100px] -z-10 rounded-full" />
        
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out max-w-4xl mx-auto">
          <Badge variant="outline" className="mb-6 px-4 py-1.5 rounded-full border-primary/20 bg-primary/5 text-primary animate-in zoom-in-50 duration-700 delay-200">
            ✨ The #1 Booking Platform in India
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-br from-foreground via-foreground to-primary/50 drop-shadow-sm">
            {HERO_TITLE}
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12 mx-auto leading-relaxed">
            {HERO_SUBTITLE}
          </p>
          
          {/* Search Bar */}
          <div className="flex w-full max-w-lg items-center p-2 rounded-full bg-background/80 backdrop-blur-xl border shadow-xl mb-12 mx-auto transition-all hover:shadow-2xl hover:scale-[1.01] hover:border-primary/20">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-3 h-5 w-5 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Try 'Haircut' or 'Plumber'..." 
                className="pl-12 h-11 border-none focus-visible:ring-0 bg-transparent shadow-none text-base"
              />
            </div>
            <Link href="/services">
              <Button size="lg" className="rounded-full px-8 h-11 shadow-md">Search</Button>
            </Link>
          </div>

          <div className="flex flex-wrap gap-4 justify-center items-center">
            <Link href="/services">
              <Button size="lg" className="rounded-full px-8 h-12 text-base shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                Book a Service
              </Button>
            </Link>
            <Link href="/register?role=provider">
              <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-base hover:bg-muted/50 transition-all">
                Join as Provider
              </Button>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="mt-16 pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-center gap-8 text-muted-foreground text-sm">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-bold">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <span>Trusted by <span className="font-semibold text-foreground">10,000+</span> users</span>
            </div>
            <div className="hidden md:block h-4 w-px bg-border/60" />
            <div className="flex items-center gap-2 text-yellow-500">
               <div className="flex">
                 {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-current" />)}
               </div>
               <span className="text-muted-foreground"><span className="font-semibold text-foreground">4.9/5</span> average rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose ServiceBook?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">We make booking services as easy as ordering pizza. Secure, fast, and reliable.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Smart Search", desc: "Find exactly what you need with our AI-powered matchmaking.", icon: Search, color: "text-blue-500", bg: "bg-blue-500/10" },
              { title: "Instant Booking", desc: "Real-time availability means no more back-and-forth calls.", icon: Calendar, color: "text-green-500", bg: "bg-green-500/10" },
              { title: "Verified Pros", desc: "Every provider is vetted for quality and safety compliance.", icon: Shield, color: "text-purple-500", bg: "bg-purple-500/10" }
            ].map((feature, i) => (
              <div key={i} className="group flex flex-col items-center text-center p-8 rounded-2xl border bg-card hover:shadow-lg transition-all hover:-translate-y-2 duration-300">
                <div className={`h-16 w-16 ${feature.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                <Link href="/about" className="mt-6 text-primary font-medium flex items-center hover:underline opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-background">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <div className="grid md:grid-cols-4 gap-8 mb-12 text-left">
             <div>
               <h4 className="font-bold text-foreground mb-4">ServiceBook</h4>
               <p className="text-sm">The easiest way to book local services.</p>
             </div>
             <div>
               <h4 className="font-bold text-foreground mb-4">Platform</h4>
               <ul className="space-y-2 text-sm">
                 <li><Link href="/services">Browse Services</Link></li>
                 <li><Link href="/providers">For Providers</Link></li>
                 <li><Link href="/pricing">Pricing</Link></li>
               </ul>
             </div>
             <div>
               <h4 className="font-bold text-foreground mb-4">Company</h4>
               <ul className="space-y-2 text-sm">
                 <li><Link href="/about">About Us</Link></li>
                 <li><Link href="/blog">Blog</Link></li>
                 <li><Link href="/careers">Careers</Link></li>
               </ul>
             </div>
             <div>
               <h4 className="font-bold text-foreground mb-4">Legal</h4>
               <ul className="space-y-2 text-sm">
                 <li><Link href="/privacy">Privacy</Link></li>
                 <li><Link href="/terms">Terms</Link></li>
               </ul>
             </div>
          </div>
          <p className="pt-8 border-t">&copy; 2024 ServiceBook. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
