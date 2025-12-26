import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Scale, CheckCircle2, AlertCircle, Terminal } from "lucide-react";

export default function TermsPage() {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto py-20 px-6 space-y-12">
        <div className="space-y-4 text-center">
          <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
            <Scale className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-5xl font-black tracking-tighter">Terms of Service</h1>
          <p className="text-muted-foreground font-medium">Last updated: December 26, 2025</p>
        </div>

        <div className="grid gap-8">
          <Card className="border-none shadow-xl bg-card rounded-[2rem] overflow-hidden">
            <CardContent className="p-8 space-y-8">
              <section className="space-y-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" /> 1. Acceptance of Terms
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing or using ProjectMind, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-primary" /> 2. Use of Services
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account. ProjectMind is intended for personal and professional organizational use.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-primary" /> 3. Limitations of Liability
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  ProjectMind is provided "as is" without any warranties. We are not liable for any data loss or service interruptions that may occur during use.
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
