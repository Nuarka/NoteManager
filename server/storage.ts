import { type User, type InsertUser, type Project, type Note, type Todo } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Projects
  getProjects(): Promise<Project[]>;
  createProject(project: Project): Promise<Project>;
  deleteProject(id: string): Promise<void>;
  
  // Notes
  getNotes(): Promise<Note[]>;
  createNote(note: Note): Promise<Note>;
  updateNote(id: string, updates: Partial<Note>): Promise<Note>;
  deleteNote(id: string): Promise<void>;
  
  // Todos
  getTodos(): Promise<Todo[]>;
  createTodo(todo: Todo): Promise<Todo>;
  updateTodo(id: string, updates: Partial<Todo>): Promise<Todo>;
  deleteTodo(id: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private projects: Map<string, Project>;
  private notes: Map<string, Note>;
  private todos: Map<string, Todo>;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.notes = new Map();
    this.todos = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProjects() { return Array.from(this.projects.values()); }
  async createProject(p: Project) { this.projects.set(p.id, p); return p; }
  async deleteProject(id: string) { this.projects.delete(id); }

  async getNotes() { return Array.from(this.notes.values()); }
  async createNote(n: Note) { this.notes.set(n.id, n); return n; }
  async updateNote(id: string, u: Partial<Note>) {
    const n = this.notes.get(id);
    if (!n) throw new Error("Note not found");
    const updated = { ...n, ...u };
    this.notes.set(id, updated);
    return updated;
  }
  async deleteNote(id: string) { this.notes.delete(id); }

  async getTodos() { return Array.from(this.todos.values()); }
  async createTodo(t: Todo) { this.todos.set(t.id, t); return t; }
  async updateTodo(id: string, u: Partial<Todo>) {
    const t = this.todos.get(id);
    if (!t) throw new Error("Todo not found");
    const updated = { ...t, ...u };
    this.todos.set(id, updated);
    return updated;
  }
  async deleteTodo(id: string) { this.todos.delete(id); }
}

export const storage = new MemStorage();
