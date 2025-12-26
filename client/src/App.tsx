import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Notes from "@/pages/Notes";
import Maps from "@/pages/Maps";
import NotePage from "@/pages/NotePage";
import ProjectPage from "@/pages/ProjectPage";
import AboutPage from "@/pages/AboutPage";
import ChatPage from "@/pages/ChatPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/notes" component={Notes} />
      <Route path="/notes/:id" component={NotePage} />
      <Route path="/maps" component={Maps} />
      <Route path="/projects/:id" component={ProjectPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/chat" component={ChatPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
