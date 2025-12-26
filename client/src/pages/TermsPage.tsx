import { AppLayout } from "@/components/layout/AppLayout";

export default function TermsPage() {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto py-20 px-6 space-y-8">
        <h1 className="text-4xl font-black tracking-tighter">Terms of Service</h1>
        <div className="prose prose-stone dark:prose-invert">
          <p className="text-muted-foreground font-medium">Last updated: December 26, 2025</p>
          <p>This is a placeholder for the ProjectMind Terms of Service.</p>
          <h2 className="text-2xl font-bold mt-8 mb-4">User Agreement</h2>
          <p>By using ProjectMind, you agree to these placeholder terms.</p>
        </div>
      </div>
    </AppLayout>
  );
}
