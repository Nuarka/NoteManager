import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Mail, Sparkles, Heart, Cookie, ExternalLink, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

import { useState, useEffect } from "react";

const HAPPY_EMOJIS = [
  "👨‍💻", "👩‍💻", "🧑‍💻", "💻", "🖥️", "🖱️", "⌨️", "🖲️", "🧮", "💡", "⚡", "🔥", "✨", "🌟", "🚀", "🛠️", "🔧", "🔨", "⚙️", "🧰", "🪛", "🗜️", "📂", "🗂️", "📁", "📄", "📝", "✏️", "🖊️", "🖋️", "📌", "📍", "🔍", "🧩", "♟️", "🎮", "🕹️", "🎲", "🎯", "🏆", "🥇", "🥈", "🥉", "🏅", "🎖️", "🧠", "🤓", "😎", "🫡", "🙌", "🤩", "🥳", "🎉", "🎨", "🖌️", "🖍️", "🎵", "🎶", "🎧", "🎹", "🎷", "🎺", "🥁", "🪕", "🎤", "🎬", "📸", "🎥", "💿", "📀", "🛸", "🌌", "☄️", "🪐", "🌍", "🌎", "🌏", "🌕", "🌖", "🌗", "🌘", "🌑", "🌙", "⭐", "💫", "🌈", "🌊", "💼", "🧳", "⌛", "⏳", "⏰", "🕰️", "📡", "🔋", "🔌", "🧵", "🪡", "🪢", "📐", "📏", "🛹", "🚴‍♂️", "🏄‍♀️", "🏋️‍♂️", "🤸‍♀️"
];

export default function AboutPage() {
  const [emoji, setEmoji] = useState("👨‍💻");
  const [isTyping, setIsTyping] = useState(false);

  const [formData, setFormData] = useState({ name: "", subject: "", message: "" });

  const handleSendMessage = () => {
    if (!formData.name || !formData.message) {
      toast.error("Please fill in your name and message");
      return;
    }
    toast.success("Message sent successfully! (Demo mode)");
    setFormData({ name: "", subject: "", message: "" });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(true);
      setTimeout(() => {
        const next =
          HAPPY_EMOJIS[Math.floor(Math.random() * HAPPY_EMOJIS.length)];
        setEmoji(next);
        setIsTyping(false);
      }, 1000); // Time for the blur/fade out
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto py-12 px-6 pt-[0px] pb-[0px]">
        <div className="text-center space-y-4 mb-16 pt-8">
          <Badge
            variant="outline"
            className="px-4 py-1 rounded-full border-primary/20 text-primary font-bold uppercase tracking-widest text-[10px]"
          >
            Meet the Creator
          </Badge>
          <h1 className="text-6xl font-black tracking-tighter">
            About <span className="text-primary italic">ProjectMind</span>
          </h1>
          <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
            A passion project built to revolutionize how we capture ideas and
            manage projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          <Card className="border-none shadow-2xl bg-card rounded-[2.5rem] overflow-hidden group border border-muted-foreground/5 h-full">
            <div className="aspect-square bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5 p-12 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary),0.1),transparent)] group-hover:scale-150 transition-transform duration-1000" />
              <div
                className="text-8xl select-none cursor-pointer transition-all duration-1000 ease-in-out relative z-10"
                style={{
                  animation: "float 6s ease-in-out infinite",
                  transform: `scale(${isTyping ? 0.8 : 1})`,
                  opacity: isTyping ? 0 : 1,
                  filter: isTyping ? "blur(20px)" : "blur(0px)",
                }}
              >
                {emoji}
              </div>
              <style>{`
                @keyframes float {
                  0%, 100% { transform: translateY(0px) rotate(0deg); }
                  25% { transform: translateY(-20px) rotate(5deg); }
                  75% { transform: translateY(20px) rotate(-5deg); }
                }
              `}</style>
            </div>
            <CardContent className="p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-3xl font-black tracking-tight">
                  Tamilov Danila
                </h2>
                <p className="text-primary font-bold">Full-Stack Developer</p>
              </div>
              <p className="text-muted-foreground leading-relaxed font-medium">
                I'm a 16-year-old developer currently in the 10th grade. I have
                a deep passion for creating digital products that solve
                real-world problems.
              </p>
              <div className="flex gap-4 pt-4">
                <Badge
                  variant="secondary"
                  className="rounded-lg px-3 py-1 font-bold bg-primary/10 text-primary border-none"
                >
                  16 Years Old
                </Badge>
                <Badge
                  variant="secondary"
                  className="rounded-lg px-3 py-1 font-bold bg-primary/10 text-primary border-none"
                >
                  10th Grade
                </Badge>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-8 h-full">
            <Card className="border-none shadow-2xl bg-gradient-to-br from-orange-500 to-orange-600 rounded-[2.5rem] overflow-hidden text-white border-none relative group hover:scale-[1.02] transition-transform duration-500 h-auto">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Cookie className="h-24 w-24 -rotate-12" />
              </div>
              <CardContent className="p-8 space-y-6 relative z-10">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black tracking-tight flex items-center gap-2">
                    Support Me! <Heart className="h-6 w-6 fill-current animate-pulse" />
                  </h3>
                  <p className="text-orange-100 font-medium leading-relaxed text-sm">
                    If you like ProjectMind, consider supporting its development. Every contribution helps me learn and build more!
                  </p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                  <p className="text-[10px] uppercase font-black tracking-widest text-orange-200 mb-1">PayPal Email</p>
                  <p className="font-bold select-all cursor-pointer hover:text-white transition-colors text-xs truncate">tamilovdanila@gmail.com</p>
                </div>

                <Button 
                  onClick={() => window.open("https://www.paypal.com/paypalme/danilatamilov", "_blank")}
                  className="w-full bg-white text-orange-600 hover:bg-orange-50 font-black rounded-xl py-6 gap-2 shadow-xl shadow-orange-900/20 text-sm"
                >
                  <ExternalLink className="h-4 w-4" /> Support via PayPal
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="text-2xl font-black tracking-tight flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" /> The Mission
              </h3>
              <p className="text-muted-foreground leading-relaxed font-medium text-sm">
                Combining rich text editing, mind maps, and AI assistance into one cohesive workspace.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <a
                href="#"
                className="flex items-center gap-3 p-4 rounded-2xl bg-muted/50 hover:bg-muted transition-colors border border-muted-foreground/5 group"
              >
                <Github className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="font-bold text-xs">GitHub</span>
              </a>
              <a
                href="mailto:tamilovdanila@gmail.com"
                className="flex items-center gap-3 p-4 rounded-2xl bg-muted/50 hover:bg-muted transition-colors border border-muted-foreground/5 group"
              >
                <Mail className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="font-bold text-xs">Contact</span>
              </a>
            </div>
          </div>

          <Card className="border-none shadow-2xl bg-card rounded-[2.5rem] overflow-hidden border border-muted-foreground/5 h-full">
            <CardContent className="p-8 space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-black tracking-tight flex items-center gap-2">
                  <Send className="h-6 w-6 text-primary" /> Get in Touch
                </h3>
                <p className="text-muted-foreground font-medium text-sm">
                  Have a question or a suggestion? Drop me a message!
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Your Name</p>
                  <Input 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name" 
                    className="rounded-xl bg-muted/50 border-none h-11 focus-visible:ring-primary/20" 
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Subject</p>
                  <Input 
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="What's this about?" 
                    className="rounded-xl bg-muted/50 border-none h-11 focus-visible:ring-primary/20" 
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Message</p>
                  <Textarea 
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Type your message here..." 
                    className="rounded-xl bg-muted/50 border-none min-h-[120px] focus-visible:ring-primary/20 resize-none" 
                  />
                </div>
                <Button 
                  onClick={handleSendMessage}
                  className="w-full rounded-xl py-6 font-black gap-2 shadow-xl shadow-primary/20"
                >
                  <Send className="h-4 w-4" /> Send Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-20 text-center text-muted-foreground/40 text-sm font-bold tracking-widest uppercase pb-12">
          Made with curiosity • 2025
        </div>
      </div>
    </AppLayout>
  );
}