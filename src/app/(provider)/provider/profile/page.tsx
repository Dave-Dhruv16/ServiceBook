"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Upload } from "lucide-react";

export default function ProviderProfileSettingsPage() {
  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your public profile information and appearance.</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>This will be displayed on your booking page.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-6">
             <div className="relative group cursor-pointer">
                <Avatar className="h-24 w-24">
                   <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                   <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <Camera className="h-6 w-6 text-white" />
                </div>
             </div>
             <div className="space-y-1">
                <h4 className="text-sm font-medium">Profile photo</h4>
                <p className="text-xs text-muted-foreground max-w-[200px]">
                   Supports JPG, PNG or GIF. Max size 2MB.
                </p>
                <div className="flex gap-2 mt-2">
                   <Button size="sm" variant="outline" className="h-8">
                      <Upload className="h-3 w-3 mr-2" /> Upload
                   </Button>
                   <Button size="sm" variant="ghost" className="h-8 text-destructive hover:text-destructive hover:bg-destructive/10">
                      Remove
                   </Button>
                </div>
             </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Visible to potential clients.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                   <label className="text-sm font-medium">Display Name</label>
                   <Input defaultValue="Dr. Sarah Johnson" />
                </div>
                <div className="space-y-2">
                   <label className="text-sm font-medium">Profession / Title</label>
                   <Input defaultValue="Dermatologist" />
                </div>
             </div>
             
             <div className="space-y-2">
               <label className="text-sm font-medium">Bio</label>
               <Textarea 
                  defaultValue="Experienced dermatologist with 10+ years of practice specializing in skincare and cosmetic treatments. Dedicated to patient care." 
                  className="min-h-[100px]"
               />
               <p className="text-xs text-muted-foreground text-right">0/500 characters</p>
             </div>
             
             <div className="space-y-2">
               <label className="text-sm font-medium">Location</label>
               <Input defaultValue="New York, NY" className="max-w-md" />
             </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t bg-muted/20 p-6">
            <span className="text-sm text-muted-foreground">Last updated yesterday</span>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Private contact details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                 <label className="text-sm font-medium">Email</label>
                 <Input defaultValue="sarah@example.com" />
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-medium">Phone</label>
                 <Input defaultValue="+1 (555) 987-6543" />
               </div>
             </div>
          </CardContent>
          <CardFooter className="flex justify-end p-6 border-t bg-muted/20">
            <Button variant="outline">Update Contact</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
