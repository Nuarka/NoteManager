import { useState, useEffect, useRef } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Send, Trash2, Bot, User, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentConversationId, setCurrentConversationId] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initChat = async () => {
      try {
        const res = await fetch("/api/conversations");
        const convs = await res.json();
        if (convs.length === 0) {
          const createRes = await fetch("/api/conversations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: "My First AI Chat" }),
          });
          const newConv = await createRes.json();
          setCurrentConversationId(newConv.id);
        } else {
          setCurrentConversationId(convs[0].id);
          const messagesRes = await fetch(`/api/conversations/${convs[0].id}`);
          const data = await messagesRes.json();
          if (data.messages) setMessages(data.messages);
        }
      } catch (e) {
        console.error("Chat init error:", e);
      }
    };
    initChat();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth"
    });
  }, [messages, isLoading, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isLoading || !currentConversationId) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response = await fetch(`/api/conversations/${currentConversationId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: input }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      const reader = response.body?.getReader();
      if (!reader) return;

      let assistantContent = "";
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (trimmedLine.startsWith("data: ")) {
            try {
              const data = JSON.parse(trimmedLine.slice(6));
              if (data.content) {
                const newContent = data.content;
                for (let i = 0; i < newContent.length; i++) {
                  await new Promise(resolve => setTimeout(resolve, 5));
                  assistantContent += newContent[i];
                  setMessages((prev) => {
                    const newMessages = [...prev];
                    const lastMsg = newMessages[newMessages.length - 1];
                    if (lastMsg && lastMsg.role === "assistant") {
                      lastMsg.content = assistantContent;
                    }
                    return [...newMessages];
                  });
                }
              }
            } catch (e) {}
          }
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-4rem)] p-6 relative">
        <div className="flex items-center justify-between shrink-0 mb-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tighter flex items-center gap-3">
              <Sparkles className="h-8 w-8 text-primary" /> AI Assistant
            </h1>
            <p className="text-muted-foreground font-medium">Powered by Groq Llama-3</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setMessages([])} className="rounded-xl gap-2 font-bold px-4 h-9">
            <Trash2 className="h-4 w-4" /> Clear Chat
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary/10 hover:scrollbar-thumb-primary/20">
          <div className="space-y-8 pb-32">
            {messages.length === 0 && (
              <div className="h-[40vh] flex flex-col items-center justify-center text-center space-y-6 opacity-40">
                <div className="bg-primary/10 p-8 rounded-[2.5rem]">
                  <Bot className="h-16 w-16 text-primary" />
                </div>
                <div className="space-y-2">
                  <p className="text-3xl font-black">How can I help you today?</p>
                  <p className="text-lg font-medium">Brainstorm ideas, analyze notes, or plan projects.</p>
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={cn("flex gap-6 max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500", m.role === "user" ? "ml-auto flex-row-reverse" : "")}>
                <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 border border-muted-foreground/10 shadow-md", m.role === "assistant" ? "bg-primary text-primary-foreground" : "bg-muted")}>
                  {m.role === "assistant" ? <Bot className="h-6 w-6" /> : <User className="h-6 w-6" />}
                </div>
                <div className={cn("p-6 rounded-[2rem] text-base font-medium leading-relaxed shadow-sm", m.role === "assistant" ? "bg-muted/30 text-foreground rounded-tl-none border border-muted-foreground/5" : "bg-primary text-primary-foreground rounded-tr-none shadow-primary/20")}>
                  {m.content ? (
                    <div className="prose prose-sm sm:prose dark:prose-invert max-w-none">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {m.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <div className="flex gap-1.5 items-center h-6">
                      <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" />
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
              <div className="flex gap-6 max-w-3xl animate-in fade-in duration-300">
                <div className="h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 border border-muted-foreground/10 shadow-md bg-primary text-primary-foreground">
                  <Bot className="h-6 w-6" />
                </div>
                <div className="p-6 rounded-[2rem] text-base font-medium leading-relaxed shadow-sm bg-muted/30 text-foreground rounded-tl-none border border-muted-foreground/5">
                  <div className="flex gap-1.5 items-center h-6">
                    <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" />
                  </div>
                </div>
              </div>
            )}
            <div ref={scrollRef} className="h-1" />
          </div>
        </div>

        <div className="absolute bottom-6 left-6 right-6 pointer-events-none z-10">
          <div className="max-w-4xl mx-auto pointer-events-auto">
            <div className="flex gap-4 relative">
              <Input 
                placeholder="Type your message..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="h-16 pl-8 pr-20 bg-card border border-primary/10 shadow-2xl rounded-3xl text-lg font-medium focus-visible:ring-primary/20 placeholder:text-muted-foreground/50"
              />
              <Button 
                onClick={handleSend} 
                disabled={isLoading}
                className="absolute right-3 top-3 h-10 w-10 rounded-2xl shadow-lg active:scale-95 transition-all p-0"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}