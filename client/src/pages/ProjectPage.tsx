import { AppLayout } from "@/components/layout/AppLayout";
import { useStore } from "@/lib/store";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Info, History, Lightbulb, Pencil, Check, X, Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ProjectPage() {
  const [, params] = useRoute("/projects/:id");
  const { projects, updateProject } = useStore();
  const project = projects.find(p => p.id === params?.id);
  
  const [randomFact, setRandomFact] = useState("Loading interesting fact...");
  const [isEditingHeader, setIsEditingHeader] = useState(false);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [isEditingVersions, setIsEditingVersions] = useState(false);

  const [editName, setEditName] = useState("");
  const [editShortDesc, setEditShortDesc] = useState("");
  const [editLongNote, setEditLongNote] = useState("");
  const [editVersions, setEditVersions] = useState<{ ver: string; date: string; desc: string }[]>([]);

  useEffect(() => {
    if (project) {
      setEditName(project.name);
      setEditShortDesc(project.description || "");
      setEditLongNote(project.longNote || "This is the main project documentation and notes area.");
      setEditVersions(project.versions || [
        { ver: "v1.0.0", date: "Oct 2025", desc: "Initial launch" }
      ]);
    }
  }, [project]);

  useEffect(() => {
    const facts = [
      "The first computer programmer was a woman named Ada Lovelace.",
      "The first computer mouse was made of wood.",
      "A group of flamingos is called a 'flamboyance'.",
      "Honey never spoils. You can eat 3,000-year-old honey.",
      "Octopuses have three hearts.",
      "The Eiffel Tower can be 15 cm taller during the summer due to thermal expansion.",
      "Bananas are berries, but strawberries aren't.",
      "A day on Venus is longer than a year on Venus.",
      "The unicorn is the national animal of Scotland.",
      "Wombat poop is cube-shaped."
    ];
    
    let factIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const type = () => {
      const currentFact = facts[factIndex];
      
      if (isDeleting) {
        setRandomFact(currentFact.substring(0, charIndex - 1));
        charIndex--;
        typingSpeed = 50;
      } else {
        setRandomFact(currentFact.substring(0, charIndex + 1));
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentFact.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        factIndex = (factIndex + 1) % facts.length;
        typingSpeed = 500; // Pause before new fact
      }

      setTimeout(type, typingSpeed);
    };

    const timeout = setTimeout(type, typingSpeed);
    return () => clearTimeout(timeout);
  }, []);

  if (!project) return <div>Project not found</div>;

  const saveHeader = () => {
    updateProject(project.id, { name: editName, description: editShortDesc });
    setIsEditingHeader(false);
  };

  const saveNote = () => {
    updateProject(project.id, { longNote: editLongNote });
    setIsEditingNote(false);
  };

  const saveVersions = () => {
    updateProject(project.id, { versions: editVersions });
    setIsEditingVersions(false);
  };

  const addVersion = () => {
    setEditVersions([{ ver: "v1.0.0", date: "Today", desc: "New version" }, ...editVersions]);
  };

  const deleteVersion = (index: number) => {
    setEditVersions(editVersions.filter((_, i) => i !== index));
  };

  const updateVersion = (index: number, field: string, value: string) => {
    const newVers = [...editVersions];
    newVers[index] = { ...newVers[index], [field]: value };
    setEditVersions(newVers);
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-8 pb-12 px-6">
        {/* Header */}
        <div className="space-y-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2 -ml-2 text-muted-foreground hover:text-foreground transition-all">
              <ChevronLeft className="h-4 w-4" /> Back to Dashboard
            </Button>
          </Link>
          <div className="flex items-start gap-6 group relative">
            <div className="h-16 w-3 rounded-full shadow-sm mt-2 shrink-0 bg-primary/20" style={{ backgroundColor: project.color }} />
            <div className="space-y-2 flex-1">
              {isEditingHeader ? (
                <div className="space-y-4 bg-muted/30 p-6 rounded-3xl border border-muted-foreground/10 shadow-inner">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Project Name</label>
                    <Input 
                      value={editName} 
                      onChange={(e) => setEditName(e.target.value)}
                      className="text-4xl font-black h-auto py-2 bg-background/50 border-none shadow-sm focus-visible:ring-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Brief Description</label>
                    <Textarea 
                      value={editShortDesc} 
                      onChange={(e) => setEditShortDesc(e.target.value)}
                      className="text-xl min-h-[100px] bg-background/50 border-none shadow-sm resize-none focus-visible:ring-primary/20"
                      placeholder="Enter a brief project overview..."
                    />
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-muted-foreground/10">
                    <Button onClick={saveHeader} className="gap-2 font-black px-8 bg-primary hover:bg-primary/90 transition-all active:scale-95 shadow-lg rounded-2xl">
                      <Check className="h-4 w-4" /> Save
                    </Button>
                    <Button onClick={() => setIsEditingHeader(false)} variant="outline" className="gap-2 font-black px-8 active:scale-95 transition-all rounded-2xl">
                      <X className="h-4 w-4" /> Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-4">
                    <h1 className="text-6xl font-black tracking-tighter text-foreground leading-none">{project.name}</h1>
                    <Button variant="ghost" size="icon" onClick={() => setIsEditingHeader(true)} className="opacity-0 group-hover:opacity-100 transition-all hover:bg-primary/10 hover:text-primary rounded-xl h-10 w-10">
                      <Pencil className="h-5 w-5" />
                    </Button>
                  </div>
                  <p className="text-2xl text-muted-foreground font-medium leading-relaxed max-w-4xl">
                    {project.description || "This project is waiting for a detailed description to outline its goals and vision."}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
          {/* Project Note (70%) */}
          <Card className="lg:col-span-7 border-none shadow-2xl bg-card rounded-[3rem] overflow-hidden min-h-[600px] flex flex-col border border-muted-foreground/5">
            <CardHeader className="border-b bg-muted/20 py-8 px-12 flex flex-row items-center justify-between shrink-0">
              <div className="flex items-center gap-4 text-primary font-black uppercase tracking-[0.3em] text-[11px]">
                <div className="p-3 bg-primary/10 rounded-2xl">
                  <Info className="h-5 w-5" />
                </div>
                Project Documentation
              </div>
              {!isEditingNote && (
                <Button variant="ghost" size="sm" onClick={() => setIsEditingNote(true)} className="gap-2 font-black hover:bg-primary/10 hover:text-primary px-4 rounded-xl">
                  <Pencil className="h-4 w-4" /> Edit Content
                </Button>
              )}
            </CardHeader>
            <CardContent className="p-12 flex-1 flex flex-col">
              {isEditingNote ? (
                <div className="space-y-8 flex-1 flex flex-col">
                  <Textarea 
                    value={editLongNote} 
                    onChange={(e) => setEditLongNote(e.target.value)}
                    className="flex-1 min-h-[450px] text-xl p-10 rounded-[2.5rem] bg-muted/10 border-none shadow-inner resize-none focus-visible:ring-primary/10 leading-relaxed font-medium"
                    placeholder="Write detailed project notes and documentation here..."
                  />
                  <div className="flex gap-4">
                    <Button onClick={saveNote} className="gap-3 font-black px-10 py-7 rounded-[1.5rem] shadow-xl active:scale-95 transition-all text-lg">
                      <Check className="h-6 w-6" /> Save Changes
                    </Button>
                    <Button onClick={() => setIsEditingNote(false)} variant="outline" className="gap-3 font-black px-10 py-7 rounded-[1.5rem] active:scale-95 transition-all text-lg">
                      <X className="h-6 w-6" /> Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="prose prose-xl dark:prose-invert max-w-none whitespace-pre-wrap leading-relaxed text-foreground/70 font-medium">
                  {editLongNote}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Versions/Reporting (30%) */}
          <Card className="lg:col-span-3 border-none shadow-2xl bg-card rounded-[3rem] overflow-hidden flex flex-col border border-muted-foreground/5">
            <CardHeader className="border-b bg-muted/20 py-8 px-10 flex flex-row items-center justify-between shrink-0">
              <div className="flex items-center gap-4 text-primary font-black uppercase tracking-[0.3em] text-[11px]">
                <div className="p-3 bg-primary/10 rounded-2xl">
                  <History className="h-5 w-5" />
                </div>
                Evolution
              </div>
              {!isEditingVersions && (
                <Button variant="ghost" size="sm" onClick={() => setIsEditingVersions(true)} className="gap-2 font-black hover:bg-primary/10 hover:text-primary px-4 rounded-xl">
                  <Pencil className="h-4 w-4" /> Edit
                </Button>
              )}
            </CardHeader>
            <CardContent className="p-10 flex-1 flex flex-col">
              {isEditingVersions ? (
                <div className="space-y-8 flex-1 flex flex-col">
                  <Button onClick={addVersion} variant="outline" size="sm" className="w-full h-16 gap-3 border-dashed border-[3px] rounded-[1.5rem] hover:border-primary hover:text-primary hover:bg-primary/5 transition-all active:scale-[0.98] font-black text-xs uppercase tracking-widest">
                    <Plus className="h-5 w-5" /> Create New Entry
                  </Button>
                  <div className="space-y-6 flex-1 overflow-y-auto pr-3 custom-scrollbar">
                    {editVersions.map((v, i) => (
                      <div key={i} className="p-6 bg-muted/30 rounded-[2rem] space-y-4 relative group/v border border-muted-foreground/5 shadow-sm transition-all hover:bg-muted/50">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => deleteVersion(i)}
                          className="absolute right-4 top-4 h-10 w-10 text-destructive opacity-0 group-hover/v:opacity-100 transition-all hover:bg-destructive/10 rounded-2xl"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                        <div className="space-y-4">
                          <div className="space-y-1">
                            <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 ml-2">Version</label>
                            <Input 
                              placeholder="v1.0.0" 
                              value={v.ver} 
                              onChange={(e) => updateVersion(i, 'ver', e.target.value)}
                              className="h-11 font-black bg-background/40 border-none shadow-sm rounded-xl px-4"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 ml-2">Release Date</label>
                            <Input 
                              placeholder="Oct 2025" 
                              value={v.date} 
                              onChange={(e) => updateVersion(i, 'date', e.target.value)}
                              className="h-11 text-xs font-bold bg-background/40 border-none shadow-sm rounded-xl px-4"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 ml-2">Change Log</label>
                            <Textarea 
                              placeholder="Describe the changes..." 
                              value={v.desc} 
                              onChange={(e) => updateVersion(i, 'desc', e.target.value)}
                              className="text-xs min-h-[120px] bg-background/40 border-none shadow-sm rounded-[1.25rem] resize-none px-4 py-3 leading-relaxed font-medium"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3 pt-6 border-t border-muted-foreground/10 shrink-0">
                    <Button onClick={saveVersions} className="flex-1 gap-2 font-black py-7 rounded-[1.25rem] shadow-xl active:scale-95 transition-all">
                      <Check className="h-5 w-5" /> Save History
                    </Button>
                    <Button onClick={() => setIsEditingVersions(false)} variant="outline" className="flex-1 gap-2 font-black py-7 rounded-[1.25rem] active:scale-95 transition-all">
                      <X className="h-5 w-5" /> Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-10 py-4">
                  {editVersions.length > 0 ? editVersions.map((v, i) => (
                    <div key={i} className="relative pl-10 pb-4 border-l-[3px] border-muted last:border-0 last:pb-0 group/item">
                      <div className="absolute left-[-13px] top-0 h-6 w-6 rounded-full bg-primary ring-[6px] ring-background shadow-xl transition-all group-hover/item:scale-125 group-hover/item:shadow-primary/30" />
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-black text-base tracking-tighter text-foreground">{v.ver}</span>
                          <span className="text-[10px] text-primary font-black uppercase tracking-widest bg-primary/5 px-3 py-1.5 rounded-full border border-primary/10 shadow-sm">{v.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap font-medium">{v.desc}</p>
                      </div>
                    </div>
                  )) : (
                    <div className="py-20 text-center space-y-6">
                      <div className="bg-muted/30 w-16 h-16 rounded-[2rem] flex items-center justify-center mx-auto shadow-inner">
                        <History className="h-8 w-8 text-muted-foreground/30" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-base text-muted-foreground font-bold tracking-tight px-4">Timeline is empty</p>
                        <p className="text-xs text-muted-foreground/60 font-medium px-8">Start tracking your project's progress by adding your first version entry.</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Random Fact Footer */}
        <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-600 p-[3px] rounded-[3rem] shadow-2xl group transition-all hover:scale-[1.01] active:scale-[0.99] mt-12">
          <div className="bg-card rounded-[calc(3rem-2px)] p-10 flex items-center gap-10 border border-white/5 backdrop-blur-sm">
            <div className="bg-primary/10 p-6 rounded-[2rem] group-hover:bg-primary/20 transition-all shadow-inner border border-primary/10">
              <Lightbulb className="h-12 w-12 text-primary animate-pulse" />
            </div>
            <div className="space-y-3 flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-black uppercase tracking-[0.4em] text-[11px] text-muted-foreground/50">Curated Knowledge</h4>
                <div className="h-[2px] w-16 bg-gradient-to-r from-primary/50 to-transparent rounded-full" />
              </div>
              <p className="text-3xl font-black tracking-tight text-foreground leading-tight transition-all duration-1000 ease-in-out">
                {randomFact}
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}