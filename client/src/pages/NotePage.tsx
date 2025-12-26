import { AppLayout } from "@/components/layout/AppLayout";
import { Editor } from "@/components/editor/Editor";
import { useStore } from "@/lib/store";
import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Link } from "wouter";

export default function NotePage() {
  const [, params] = useRoute("/notes/:id");
  const { notes, updateNote, addNote } = useStore();
  
  const noteId = params?.id;
  const existingNote = notes.find(n => n.id === noteId);
  
  const [title, setTitle] = useState(existingNote?.title || "Untitled Note");
  const [content, setContent] = useState(existingNote?.content || "");

  useEffect(() => {
    if (existingNote) {
      setTitle(existingNote.title);
      setContent(existingNote.content);
    }
  }, [existingNote]);

  // Autosave
  useEffect(() => {
    if (existingNote && (title !== existingNote.title || content !== existingNote.content)) {
      const timer = setTimeout(() => {
        updateNote(existingNote.id, { title, content, updatedAt: new Date() });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [title, content, existingNote, updateNote]);

  return (
    <AppLayout>
       <div className="flex flex-col h-[calc(100vh-6rem)]">
         <div className="flex items-center gap-4 mb-4">
           <Link href="/notes">
             <Button variant="ghost" size="icon" asChild>
                <span className="cursor-pointer">
                  <ChevronLeft className="h-5 w-5" />
                </span>
             </Button>
           </Link>
           <Input 
             value={title} 
             onChange={(e) => setTitle(e.target.value)}
             className="text-2xl font-bold border-none shadow-none focus-visible:ring-0 px-0 h-auto bg-transparent"
             placeholder="Note Title"
           />
           <div className="flex-1" />
         </div>
         
         <div className="flex-1 min-h-0">
           <Editor content={content} onChange={setContent} />
         </div>
       </div>
    </AppLayout>
  );
}
