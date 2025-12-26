import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  ArrowRight,
  BrainCircuit,
  FileText,
  MessageSquare,
  Shield,
  Zap,
  Layout,
  Users,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/20 overflow-x-hidden">
      {/* Decorative Floating Objects */}
      <div className="fixed inset-0 pointer-events-none -z-5 overflow-hidden">
        {/* Colorful Blobs */}
        <div className="absolute top-[10%] left-[10%] w-64 h-64 bg-primary/20 rounded-full blur-[80px] animate-pulse" />
        <div className="absolute top-[30%] right-[5%] w-72 h-72 bg-accent/20 rounded-full blur-[100px] animate-pulse delay-700" />
        <div className="absolute bottom-[15%] left-[20%] w-80 h-80 bg-orange-500/10 rounded-full blur-[110px] animate-pulse delay-1000" />
        <div className="absolute top-[60%] left-[45%] w-56 h-56 bg-emerald-500/15 rounded-full blur-[90px] animate-pulse delay-300" />
        <div className="absolute bottom-[40%] right-[15%] w-64 h-64 bg-purple-500/15 rounded-full blur-[80px] animate-pulse delay-500" />

        {/* Floating Shapes */}
        <div
          className="absolute top-[20%] right-[25%] h-12 w-12 border-2 border-primary/20 rounded-xl rotate-12 animate-bounce"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute top-[50%] left-[15%] h-8 w-8 bg-accent/20 rounded-full animate-bounce"
          style={{ animationDuration: "3s" }}
        />
        <div
          className="absolute bottom-[30%] right-[30%] h-10 w-10 border-2 border-orange-500/20 rounded-full animate-bounce"
          style={{ animationDuration: "5s" }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <BrainCircuit className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-black tracking-tighter">
              ProjectMind
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" className="font-bold">
                Log In
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button className="font-bold rounded-full px-6">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="max-w-7xl mx-auto text-center space-y-8">
          <Badge
            variant="outline"
            className="py-1 px-4 rounded-full border-primary/20 text-primary font-bold uppercase tracking-widest text-[10px] animate-fade-in"
          >
            <Sparkles className="h-3 w-3 mr-2 inline" /> Revolutionize Your
            Workflow
          </Badge>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] max-w-4xl mx-auto text-center">
            <span className="block">
              Organize Your Mind
            </span>
            <span className="block">Elevate Your Work.</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
            The all-in-one workspace that combines intelligent note-taking,
            interactive mind maps, and AI-powered assistance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="rounded-full px-8 h-14 text-lg font-black gap-2 shadow-xl shadow-primary/20 w-full sm:w-auto"
              >
                Start Building for Free <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 h-14 text-lg font-bold w-full sm:w-auto"
            >
              View Demo
            </Button>
          </div>

          {/* Hero Screenshot Placeholder */}
          <div className="mt-20 relative mx-auto max-w-5xl rounded-[2rem] border bg-card shadow-2xl overflow-hidden aspect-video group">
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent z-10" />
            <div className="w-full h-full bg-muted flex items-center justify-center p-12">
              <div className="w-full h-full rounded-xl border-2 border-dashed border-muted-foreground/20 flex flex-col items-center justify-center gap-4">
                <Layout className="h-12 w-12 text-muted-foreground/40" />
                <p className="text-muted-foreground/40 font-bold uppercase tracking-widest text-sm">
                  Interactive Dashboard Interface
                </p>
              </div>
            </div>
            {/* Floating UI Elements Mockup */}
            <div className="absolute top-1/4 left-10 z-20 w-64 h-32 bg-card rounded-2xl shadow-2xl border border-primary/20 p-4 transform -rotate-2 group-hover:rotate-0 transition-transform duration-500">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
              </div>
              <div className="space-y-2">
                <div className="h-2 w-full bg-muted rounded" />
                <div className="h-2 w-3/4 bg-muted rounded" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-black tracking-tight">
              Everything you need to{" "}
              <span className="text-primary italic">thrive</span>
            </h2>
            <p className="text-muted-foreground font-medium max-w-2xl mx-auto">
              Powerful tools built for creators, thinkers, and builders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: "Smart Notes",
                desc: "Rich text editing with Tiptap, supporting images, links, and clean formatting.",
              },
              {
                icon: BrainCircuit,
                title: "Mind Maps",
                desc: "Interactive React Flow diagrams to visualize complex ideas and connections.",
              },
              {
                icon: MessageSquare,
                title: "AI Assistant",
                desc: "Powered by Groq for lightning-fast responses and creative brainstorming.",
              },
              {
                icon: Zap,
                title: "Fast Performance",
                desc: "Built with Vite and React for a lag-free, responsive workspace experience.",
              },
              {
                icon: Shield,
                title: "Secure Data",
                desc: "Your data is stored safely with Neon PostgreSQL and protected sessions.",
              },
              {
                icon: Users,
                title: "Focus-Centric",
                desc: "Designed to keep you in the zone and minimize distractions while you work.",
              },
            ].map((feature, i) => (
              <Card
                key={i}
                className="border-none shadow-lg hover:shadow-xl transition-shadow bg-card rounded-3xl overflow-hidden group"
              >
                <CardContent className="p-8 space-y-4">
                  <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground font-medium leading-relaxed">
                    {feature.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Trust */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black tracking-tight">
              Trusted by Creative Minds
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Tamilov Danila",
                role: "Founder",
                quote: "The most intuitive workspace I've ever used.",
                avatar: "https://avatar.vercel.sh/danila",
              },
              {
                name: "Tarasenko Kirill",
                role: "User",
                quote: "Transformed how our team brainstorms ideas.",
                avatar:
                  "attached_assets/stock_images/professional_male_av_d59ce128.jpg",
              },
              {
                name: "Yanina Darya",
                role: "User",
                quote: "The AI assistant is a game changer for my writing.",
                avatar:
                  "attached_assets/stock_images/professional_female__ebe41a32.jpg",
              },
              {
                name: "Ilya",
                role: "User",
                quote: "Mind maps here are just next level.",
                avatar:
                  "attached_assets/stock_images/professional_male_av_852fec4e.jpg",
              },
            ].map((user, i) => (
              <Card
                key={i}
                className="border-none shadow-xl bg-card rounded-[2rem] overflow-hidden hover:scale-[1.02] transition-transform"
              >
                <CardContent className="p-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border-2 border-primary/20">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="font-bold text-sm">{user.name}</p>
                      <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">
                        {user.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic font-medium text-sm leading-relaxed">
                    "{user.quote}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto rounded-[3rem] bg-primary p-12 md:p-20 text-center text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]" />
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
              Ready to clear your mind?
            </h2>
            <p className="text-xl text-primary-foreground/80 font-medium max-w-xl mx-auto">
              Join hundreds of users who are already organizing their thoughts
              with ProjectMind.
            </p>
            <Link href="/dashboard">
              <Button
                size="lg"
                variant="secondary"
                className="rounded-full px-10 h-16 text-xl font-black shadow-2xl"
              >
                Get Started Now — It's Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-6 w-6 text-primary" />
            <span className="text-xl font-black tracking-tighter">
              ProjectMind
            </span>
          </div>
          <p className="text-muted-foreground font-medium text-sm">
            © 2025 ProjectMind. Built with passion for productivity.
          </p>
          <div className="flex gap-8 text-sm font-bold">
            <Link
              href="/about"
              className="hover:text-primary transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-primary transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
