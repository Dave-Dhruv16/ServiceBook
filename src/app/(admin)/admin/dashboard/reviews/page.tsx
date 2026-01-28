import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Flag } from "lucide-react";

export default function AdminReviewsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reviews</h1>
        <p className="text-muted-foreground">Moderate user feedback.</p>
      </div>

      <div className="grid gap-4">
         {[1, 2, 3].map((i) => (
           <Card key={i}>
             <CardContent className="p-6">
               <div className="flex justify-between items-start">
                 <div className="space-y-1">
                   <div className="flex items-center gap-2">
                     <span className="font-semibold">User #{i}</span>
                     <span className="text-muted-foreground text-sm">reviewed</span>
                     <span className="font-semibold">Provider Name</span>
                   </div>
                   <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="h-3 w-3 fill-current" />
                      ))}
                   </div>
                   <p className="text-sm text-muted-foreground mt-2">
                     &quot;This is a sample review content to demonstrate the layout. The service was excellent.&quot;
                   </p>
                 </div>
                 <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10">
                   <Flag className="h-4 w-4 mr-2" /> Flag
                 </Button>
               </div>
             </CardContent>
           </Card>
         ))}
      </div>
    </div>
  );
}
