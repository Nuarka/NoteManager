import { AppLayout } from "@/components/layout/AppLayout";

export default function PrivacyPage() {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto py-20 px-6 space-y-8">
        <h1 className="text-4xl font-black tracking-tighter">Privacy Policy</h1>
        <div className="prose prose-stone dark:prose-invert">
          <p className="text-muted-foreground font-medium">Last updated: December 26, 2025</p>
          <p>This is a placeholder for the ProjectMind Privacy Policy.</p>
          <h2 className="text-2xl font-bold mt-8 mb-4">Data Collection</h2>
          <p>We only collect data necessary to provide our workspace services.</p>
        </div>
      </div>
    </AppLayout>
  );
}
