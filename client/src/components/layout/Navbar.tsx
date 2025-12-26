import { Link, useLocation } from "wouter";
import { Search, Lightbulb, Menu, Plus, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useMemo, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const FACTS = [
  "Did you know? Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible.",
  "The shortest war in history lasted only 38 to 45 minutes between Britain and Zanzibar in 1896.",
  "Octopuses have three hearts and blue blood.",
  "A group of flamingos is called a 'flamboyance'.",
  "The Eiffel Tower can be 15 cm taller during the summer due to thermal expansion.",
  "Wombat poop is cube-shaped to prevent it from rolling away.",
  "There are more life forms living on your skin than there are people on the planet.",
  "Bananas are berries, but strawberries aren't.",
  "A single bolt of lightning contains enough energy to toast 100,000 slices of bread.",
  "The heart of a shrimp is located in its head."
];

export function Navbar() {
  const { searchQuery, setSearchQuery, notes, projects } = useStore();
  const [showResults, setShowResults] = useState(false);
  const [currentFact, setCurrentFact] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const getRandomFact = () => {
    const fact = FACTS[Math.floor(Math.random() * FACTS.length)];
    setCurrentFact("");
    setIsTyping(true);
    let i = 0;
    const interval = setInterval(() => {
      setCurrentFact((prev) => prev + fact[i]);
      i++;
      if (i >= fact.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 30);
  };

  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) return { notes: [], projects: [] };
    const query = searchQuery.toLowerCase();
    return {
      notes: notes
        .filter((n) => n.title.toLowerCase().includes(query))
        .slice(0, 5),
      projects: projects
        .filter((p) => p.name.toLowerCase().includes(query))
        .slice(0, 3),
    };
  }, [searchQuery, notes, projects]);

  return (
    <nav className="h-16 border-b border-border bg-card px-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-4 w-1/4">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        <Link href="/">
          <span className="flex items-center gap-2 font-bold text-xl text-primary cursor-pointer">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
              PM
            </div>
            <span className="hidden sm:inline">ProjectMind</span>
          </span>
        </Link>
      </div>

      <div className="flex-1 max-w-md mx-4 relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notes, projects..."
            className="pl-9 bg-secondary/50 border-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:bg-background transition-all"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowResults(true);
            }}
            onFocus={() => setShowResults(true)}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>

        {showResults && searchQuery.trim() && (
          <>
            <div
              className="fixed inset-0 z-[-1]"
              onClick={() => setShowResults(false)}
            />
            <Card className="absolute top-full mt-2 w-full max-h-[400px] overflow-auto shadow-2xl p-2 z-50 rounded-2xl border-muted-foreground/10">
              {filteredResults.projects.length > 0 && (
                <div className="mb-2">
                  <h4 className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    Projects
                  </h4>
                  {filteredResults.projects.map((p) => (
                    <Link key={p.id} href={`/projects/${p.id}`}>
                      <div
                        onClick={() => setShowResults(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-muted transition-colors cursor-pointer"
                      >
                        <div
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: p.color }}
                        />
                        <span className="text-sm font-bold">{p.name}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
              {filteredResults.notes.length > 0 && (
                <div>
                  <h4 className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    Notes
                  </h4>
                  {filteredResults.notes.map((n) => (
                    <Link key={n.id} href={`/notes/${n.id}`}>
                      <div
                        onClick={() => setShowResults(false)}
                        className="px-3 py-2 rounded-xl hover:bg-muted transition-colors cursor-pointer"
                      >
                        <div className="text-sm font-bold truncate">
                          {n.title}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
              {filteredResults.notes.length === 0 &&
                filteredResults.projects.length === 0 && (
                  <div className="p-4 text-center text-sm text-muted-foreground font-medium">
                    No results found
                  </div>
                )}
            </Card>
          </>
        )}
      </div>

      <div className="flex items-center gap-2 w-1/4 justify-end">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onMouseEnter={() => {
                if (!isTyping && !currentFact) getRandomFact();
              }}
            >
              <Lightbulb className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[400px] p-6 rounded-2xl shadow-2xl border-primary/10 overflow-hidden">
            <div className="space-y-3">
              <h4 className="font-black text-xs uppercase tracking-widest text-primary flex items-center gap-2">
                <Lightbulb className="h-3 w-3" /> Random Fact
              </h4>
              <div className="min-h-[140px] flex items-start overflow-hidden w-full">
                <p className="text-base font-medium leading-relaxed italic w-full">
                  {currentFact}
                  {isTyping && <span className="inline-block w-1 h-5 bg-primary ml-1 animate-pulse" />}
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start text-[10px] font-bold uppercase p-0 hover:bg-transparent h-auto pt-2"
                onClick={getRandomFact}
                disabled={isTyping}
              >
                Next Fact →
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        <Link href="/about">
          <Button
            variant="outline"
            className="gap-2 font-bold text-xs uppercase tracking-widest bg-primary/5 hover:bg-primary/10 border-primary/20 text-primary rounded-full px-4 group transition-all duration-500 hover:scale-105 active:scale-95"
          >
            <span className="hidden sm:inline">Support Author 🍪</span>
          </Button>
        </Link>
      </div>
    </nav>
  );
}
