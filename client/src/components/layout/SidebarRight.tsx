import { useStore } from "@/lib/store";
import { Check, Trash2, Plus, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SidebarRight() {
  const { todos, toggleTodo, deleteTodo, addTodo } = useStore();
  const [newTodo, setNewTodo] = useState("");
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const sortedTodos = [...todos].sort((a, b) => {
    const priorityMap = { high: 3, medium: 2, low: 1 };
    if (priorityMap[a.priority] > priorityMap[b.priority]) return -1;
    if (priorityMap[a.priority] < priorityMap[b.priority]) return 1;
    return 0;
  });

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    addTodo({
      id: crypto.randomUUID(),
      text: newTodo,
      completed: false,
      priority: priority
    });
    setNewTodo("");
    setPriority('medium');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-50 border-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-100';
      case 'low': return 'text-green-600 bg-green-50 border-green-100';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <aside className="w-72 border-l border-border bg-sidebar hidden xl:flex flex-col h-[calc(100vh-4rem)] sticky top-16">
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-primary" />
          My Tasks
        </h2>
        <p className="text-xs text-muted-foreground mt-1">
          {todos.filter(t => !t.completed).length} pending tasks
        </p>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-3">
          {sortedTodos.map(todo => (
            <div 
              key={todo.id} 
              className={cn(
                "group flex items-start gap-3 p-3 rounded-xl border border-transparent hover:border-border hover:bg-secondary/30 transition-all",
                todo.completed && "opacity-50"
              )}
            >
              <button 
                onClick={() => toggleTodo(todo.id)}
                className={cn(
                  "mt-0.5 h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors",
                  todo.completed 
                    ? "bg-primary border-primary text-primary-foreground" 
                    : "border-muted-foreground/30 hover:border-primary"
                )}
              >
                {todo.completed && <Check className="h-3 w-3" />}
              </button>
              
              <div className="flex-1 min-w-0">
                <p className={cn(
                  "text-sm font-medium leading-tight mb-1",
                  todo.completed && "line-through text-muted-foreground"
                )}>
                  {todo.text}
                </p>
                <div className="flex items-center gap-2">
                   <span className={cn(
                     "text-[10px] px-1.5 py-0.5 rounded-full font-medium uppercase tracking-wider border",
                     getPriorityColor(todo.priority)
                   )}>
                     {todo.priority}
                   </span>
                </div>
              </div>

              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity"
                onClick={() => deleteTodo(todo.id)}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border bg-sidebar/50 backdrop-blur-sm">
        <form onSubmit={handleAddTodo} className="space-y-2">
          <input 
            className="w-full bg-secondary/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
            placeholder="Add a task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex-1 text-xs gap-1 h-8">
                  <Flag className={cn("w-3 h-3", priority === 'high' ? "text-red-500" : priority === 'medium' ? "text-yellow-500" : "text-green-500")} />
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => setPriority('high')} className="text-red-500">High Priority</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPriority('medium')} className="text-yellow-600">Medium Priority</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPriority('low')} className="text-green-600">Low Priority</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" type="submit" className="h-8 px-4">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </aside>
  );
}
