import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CURRENCY, APP_NAME } from "@/constants";

export default function AdminSettingsPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
        <p className="text-muted-foreground">Configure global application parameters.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Basic site configuration.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="space-y-2">
             <label className="text-sm font-medium">Site Name</label>
             <Input defaultValue={APP_NAME} />
           </div>
           <div className="space-y-2">
             <label className="text-sm font-medium">Default Currency</label>
             <Input defaultValue={CURRENCY} />
           </div>
           <div className="space-y-2">
             <label className="text-sm font-medium">Support Email</label>
             <Input defaultValue="support@appointme.com" />
           </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Booking Rules</CardTitle>
          <CardDescription>Global constraints for appointments.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="space-y-2">
             <label className="text-sm font-medium">Max Advance Booking Days</label>
             <Input type="number" defaultValue="30" />
           </div>
           <div className="space-y-2">
             <label className="text-sm font-medium">Platform Fee (%)</label>
             <Input type="number" defaultValue="5" />
           </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="outline">Update Rules</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
