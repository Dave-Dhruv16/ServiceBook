import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, TrendingUp, Users, DollarSign } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Deep dive into your business performance.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
         <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$4,250</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
              <div className="h-32 mt-4 bg-muted/20 rounded flex items-center justify-center text-muted-foreground text-xs">
                [Revenue Chart Placeholder]
              </div>
            </CardContent>
         </Card>
         
         <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">New Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
              <div className="h-32 mt-4 bg-muted/20 rounded flex items-center justify-center text-muted-foreground text-xs">
                 [Customers Chart Placeholder]
              </div>
            </CardContent>
         </Card>

         <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Booking Conversion</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.2%</div>
              <p className="text-xs text-muted-foreground">+0.4% from last month</p>
              <div className="h-32 mt-4 bg-muted/20 rounded flex items-center justify-center text-muted-foreground text-xs">
                 [Conversion Chart Placeholder]
              </div>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}
