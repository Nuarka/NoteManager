import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Lock, Eye, FileText } from "lucide-react";

export default function PrivacyPage() {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto py-20 px-6 space-y-12">
        <div className="space-y-4 text-center">
          <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-5xl font-black tracking-tighter">Privacy Policy</h1>
          <p className="text-muted-foreground font-medium">Last updated: December 26, 2025</p>
        </div>

        <div className="grid gap-8">
          <Card className="border-none shadow-xl bg-card rounded-[2rem] overflow-hidden">
            <CardContent className="p-8 space-y-6">
              <section className="space-y-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary" /> 1. Data Collection
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We collect information that you provide directly to us when you create an account, use our services, or communicate with us. This includes your name, email address, and any content you create within the workspace.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" /> 2. Data Security
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use industry-standard security measures to protect your data. Your notes, projects, and mind maps are stored securely in our encrypted database.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" /> 3. Data Usage
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your data is used solely to provide and improve the ProjectMind experience. We do not sell your personal information to third parties.
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
