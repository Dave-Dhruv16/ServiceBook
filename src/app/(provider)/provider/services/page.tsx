"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CURRENCY } from "@/constants";
import { Plus, Trash2, Edit, Save, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
}

export default function ServicesPage() {
  const [isAdding, setIsAdding] = useState(false);
  const [services, setServices] = useState<Service[]>([
    { 
      id: "1", 
      name: "Standard Consultation", 
      description: "A standard 60-minute consultation session.",
      price: 100, 
      duration: 60,
      category: "Consulting"
    }
  ]);

  // Form State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");

  const handleAddService = () => {
    if (!name || !price || !duration) return;

    const newService: Service = {
      id: crypto.randomUUID(),
      name,
      description,
      price: Number(price),
      duration: Number(duration),
      category
    };

    setServices([...services, newService]);
    resetForm();
  };

  const resetForm = () => {
    setIsAdding(false);
    setName("");
    setDescription("");
    setPrice("");
    setDuration("");
    setCategory("");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Services</h1>
          <p className="text-muted-foreground">Manage your custom service offerings.</p>
        </div>
        {!isAdding && (
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add New Service
          </Button>
        )}
      </div>

      {/* Add Service Form */}
      {isAdding && (
        <Card className="border-primary">
          <CardHeader>
            <CardTitle>Create Custom Service</CardTitle>
            <CardDescription>Define the details of your new service.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                   <label className="text-sm font-medium">Service Name</label>
                   <Input placeholder="e.g. Deep Tissue Massage" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                   <label className="text-sm font-medium">Category (Optional)</label>
                   <Input placeholder="e.g. Wellness" value={category} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)} />
                </div>
             </div>
             <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea placeholder="Describe what clients can expect..." value={description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)} />
             </div>
             <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                   <label className="text-sm font-medium">Price ({CURRENCY})</label>
                   <Input type="number" placeholder="100" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="space-y-2">
                   <label className="text-sm font-medium">Duration (minutes)</label>
                   <Input type="number" placeholder="60" value={duration} onChange={(e) => setDuration(e.target.value)} />
                </div>
             </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2 bg-muted/20 p-4">
              <Button variant="ghost" onClick={resetForm}>Cancel</Button>
              <Button onClick={handleAddService} disabled={!name || !price}>
                <Save className="mr-2 h-4 w-4" /> Save Service
              </Button>
          </CardFooter>
        </Card>
      )}

      {/* Services Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.length === 0 && !isAdding && (
          <div className="col-span-full text-center py-12 text-muted-foreground bg-muted/20 rounded-lg border-dashed border-2">
            No services added yet. Click &quot;Add New Service&quot; to create one.
          </div>
        )}
        
        {services.map((service) => (
          <Card key={service.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                   <CardTitle className="text-lg">{service.name}</CardTitle>
                   {service.category && (
                     <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wide">{service.category}</div>
                   )}
                </div>
                <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-bold">
                  {CURRENCY}{service.price}
                </div>
              </div>
            </CardHeader>
            <CardContent>
               <p className="text-sm text-muted-foreground line-clamp-3">
                 {service.description || "No description provided."}
               </p>
               <div className="mt-4 text-sm font-medium flex items-center gap-2">
                 <span className="bg-secondary px-2 py-1 rounded text-xs">{service.duration} mins</span>
               </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-4 bg-muted/20">
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <Edit className="h-4 w-4 mr-2" /> Edit
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-destructive hover:text-destructive"
                onClick={() => setServices(services.filter(s => s.id !== service.id))}
              >
                <Trash2 className="h-4 w-4 mr-2" /> Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
