import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MoreVertical, Mail } from "lucide-react";

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">Manage registered users.</p>
        </div>
      </div>

      <div className="grid gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i}>
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center font-bold text-secondary-foreground">
                   U{i}
                 </div>
                  <div>
                    <h3 className="font-semibold">User {i}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Mail className="h-3 w-3 mr-1" /> user{i}@example.com
                    </div>
                  </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground">Joined: Jan {10 + i}, 2024</span>
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
