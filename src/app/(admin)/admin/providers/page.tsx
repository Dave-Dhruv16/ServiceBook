"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MOCK_PROVIDERS } from "@/constants";
import { MoreVertical, CheckCircle, XCircle, FileText, Check, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

export default function AdminProvidersPage() {
  const [selectedApplicant, setSelectedApplicant] = useState<typeof MOCK_PROVIDERS[0] | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Providers</h1>
          <p className="text-muted-foreground">Manage service providers and approvals.</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <FileText className="mr-2 h-4 w-4" /> Review Applications (4)
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Pending Applications</DialogTitle>
              <DialogDescription>
                Review and approve new provider requests.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
               {/* Mock Pending Applicants */}
               {[1, 2].map((i) => (
                 <div key={i} className="flex items-start justify-between p-4 border rounded-lg bg-muted/20">
                    <div className="flex gap-4">
                       <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="font-bold text-primary">JD</span>
                       </div>
                       <div>
                          <h4 className="font-semibold">John Doe</h4>
                          <p className="text-sm text-muted-foreground">Plumber • New York</p>
                          <div className="flex gap-2 mt-2">
                             <span className="text-xs bg-muted px-2 py-0.5 rounded border">ID Verified</span>
                             <span className="text-xs bg-muted px-2 py-0.5 rounded border">License Uploaded</span>
                          </div>
                       </div>
                    </div>
                    <div className="flex flex-col gap-2">
                       <Button size="sm" className="bg-green-600 hover:bg-green-700 h-8">
                          <Check className="h-3 w-3 mr-1" /> Approve
                       </Button>
                       <Button size="sm" variant="outline" className="text-destructive border-destructive/20 hover:bg-destructive/10 h-8">
                          <X className="h-3 w-3 mr-1" /> Reject
                       </Button>
                    </div>
                 </div>
               ))}
            </div>
            <DialogFooter>
              <Button variant="outline">View All Pending</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {MOCK_PROVIDERS.map((provider) => (
          <Card key={provider.id}>
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <img 
                    src={provider.image} 
                    alt={provider.name} 
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{provider.name}</h3>
                    <p className="text-sm text-muted-foreground">{provider.profession}</p>
                    <p className="text-xs text-muted-foreground">{provider.location}</p>
                  </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center text-green-600 bg-green-50 px-2 py-1 rounded text-xs font-bold">
                  <CheckCircle className="h-3 w-3 mr-1" /> Active
                </div>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
