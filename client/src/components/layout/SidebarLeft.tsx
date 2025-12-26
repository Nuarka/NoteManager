import { Link, useLocation } from "wouter";
import { useStore } from "@/lib/store";
import { 
  LayoutDashboard, 
  FileText, 
  Map as MapIcon, 
  Folder, 
  Clock, 
  Plus,
  Trash2,
  MessageSquare,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SidebarLeft() {
  const [location] = useLocation();
  const { notes, projects, addProject, deleteProject } = useStore();
  const recentNotes = notes.slice(0, 5);
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [projectName, setProjectName] = useState("");

  const handleCreateProject = () => {
    if (!projectName.trim()) return;
    addProject({
      id: crypto.randomUUID(),
      name: projectName,
      color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`,
      description: "Project description"
    });
    setProjectName("");
    setIsNewProjectOpen(false);
  };

  const NavItem = ({ href, icon: Icon, label }: { href: string; icon: any; label: string }) => {
    const isActive = location === href;
    return (
      <Link href={href}>
        <span className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors mb-1 cursor-pointer",
          isActive 
            ? "bg-primary/10 text-primary hover:bg-primary/15" 
            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
        )}>
          <Icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
          {label}
        </span>
      </Link>
    );
  };

  return (
    <aside className="w-64 border-r border-border bg-sidebar hidden md:flex flex-col h-[calc(100vh-4rem)] sticky top-16">
      <div className="p-4">
        <Link href="/about">
          <Button className="w-full justify-start gap-2 shadow-sm hover:shadow-md transition-all bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:opacity-90" size="lg">
            <Info className="h-4 w-4" />
            About Us
          </Button>
        </Link>
      </div>

      <ScrollArea className="flex-1 px-4">
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">Menu</h3>
          <NavItem href="/" icon={LayoutDashboard} label="Dashboard" />
          <NavItem href="/notes" icon={FileText} label="All Notes" />
          <NavItem href="/maps" icon={MapIcon} label="Mind Maps" />
          <NavItem href="/chat" icon={MessageSquare} label="AI Chat" />
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-3 px-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Projects</h3>
            <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => setIsNewProjectOpen(true)}><Plus className="h-3 w-3" /></Button>
          </div>
          <div className="space-y-1">
            {projects.map(project => (
              <div key={project.id} className="group relative">
                <Link href={`/projects/${project.id}`}>
                  <div className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors w-full",
                    location === `/projects/${project.id}` ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}>
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: project.color }} />
                    <span className="truncate">{project.name}</span>
                  </div>
                </Link>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6 absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity hover:text-destructive"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (confirm(`Are you sure you want to delete project "${project.name}"?`)) {
                      deleteProject(project.id);
                    }
                  }}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
           <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">Recent</h3>
           <div className="space-y-1">
             {recentNotes.map(note => (
               <Link key={note.id} href={`/notes/${note.id}`}>
                 <span className="block px-3 py-2 rounded-lg hover:bg-secondary group transition-colors cursor-pointer">
                   <div className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                     {note.title}
                   </div>
                   <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                     <Clock className="h-3 w-3" />
                     {formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}
                   </div>
                 </span>
               </Link>
             ))}
           </div>
        </div>
      </ScrollArea>

      <Dialog open={isNewProjectOpen} onOpenChange={setIsNewProjectOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name</Label>
              <Input 
                id="name" 
                value={projectName} 
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewProjectOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateProject}>Create Project</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </aside>
  );
}
