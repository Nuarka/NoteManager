import { AppLayout } from "@/components/layout/AppLayout";
import { MindMap } from "@/components/maps/MindMap";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Maps() {
  return (
    <AppLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mind Maps</h1>
          <p className="text-muted-foreground">Visualize your project structure and connections.</p>
        </div>
      </div>
      <MindMap />
    </AppLayout>
  );
}
