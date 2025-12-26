import { AppLayout } from "@/components/layout/AppLayout";
import { useStore } from "@/lib/store";
import { Link, useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Clock, Tag } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function Notes() {
  const { notes, addNote } = useStore();
  const [, setLocation] = useLocation();

  const handleCreateNote = () => {
    const newNote = {
      id: crypto.randomUUID(),
      title: "Untitled Note",
      content: "",
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    addNote(newNote);
    setLocation(`/notes/${newNote.id}`);
  };

  return (
    <AppLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">All Notes</h1>
          <p className="text-muted-foreground">Manage and organize your thoughts.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <Link key={note.id} href={`/notes/${note.id}`} className="block group">
            <Card className="h-full hover:shadow-md transition-all border-l-4 border-l-primary cursor-pointer hover:-translate-y-1">
              <CardHeader className="pb-2">
                <CardTitle className="line-clamp-1 text-lg group-hover:text-primary transition-colors">
                  {note.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  className="text-muted-foreground text-sm line-clamp-3 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: note.content }}
                />
              </CardContent>
              <CardFooter className="pt-2 text-xs text-muted-foreground flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}
                </div>
                {note.tags.length > 0 && (
                   <div className="flex items-center gap-1">
                     <Tag className="h-3 w-3" />
                     {note.tags[0]}
                   </div>
                )}
              </CardFooter>
            </Card>
          </Link>
        ))}
        
        {/* Add New Note Card Placeholder */}
        <button 
          onClick={handleCreateNote}
          className="h-full min-h-[200px] border-2 border-dashed border-muted-foreground/20 rounded-xl flex flex-col items-center justify-center text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all"
        >
          <Plus className="h-8 w-8 mb-2" />
          <span className="font-medium">Create New Note</span>
        </button>
      </div>
    </AppLayout>
  );
}
