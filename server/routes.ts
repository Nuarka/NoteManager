import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { registerChatRoutes } from "./replit_integrations/chat";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api
  registerChatRoutes(app);

  app.get("/api/projects", async (_req, res) => res.json(await storage.getProjects()));
  app.post("/api/projects", async (req, res) => res.json(await storage.createProject(req.body)));
  app.delete("/api/projects/:id", async (req, res) => {
    await storage.deleteProject(req.params.id);
    res.sendStatus(204);
  });

  app.get("/api/notes", async (_req, res) => res.json(await storage.getNotes()));
  app.post("/api/notes", async (req, res) => res.json(await storage.createNote(req.body)));
  app.patch("/api/notes/:id", async (req, res) => res.json(await storage.updateNote(req.params.id, req.body)));
  app.delete("/api/notes/:id", async (req, res) => {
    await storage.deleteNote(req.params.id);
    res.sendStatus(204);
  });

  app.get("/api/todos", async (_req, res) => res.json(await storage.getTodos()));
  app.post("/api/todos", async (req, res) => res.json(await storage.createTodo(req.body)));
  app.patch("/api/todos/:id", async (req, res) => res.json(await storage.updateTodo(req.params.id, req.body)));
  app.delete("/api/todos/:id", async (req, res) => {
    await storage.deleteTodo(req.params.id);
    res.sendStatus(204);
  });

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  return httpServer;
}
