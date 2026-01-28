import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function ReviewsPage() {
  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-3xl font-bold tracking-tight">Reviews</h1>
        <p className="text-muted-foreground">Feedback from your clients.</p>
      </div>

      <div className="grid gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-lg">Client Name</span>
                  <span className="text-sm text-muted-foreground">2 days ago</span>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Fantastic service! The provider was very professional and the results are amazing.
                Will definitely book again.
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
