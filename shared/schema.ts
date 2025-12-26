import { sql } from "drizzle-orm";
import { pgTable, text, varchar, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversation_id").notNull().references(() => conversations.id, { onDelete: "cascade" }),
  role: text("role").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertConversationSchema = createInsertSchema(conversations).omit({
  id: true,
  createdAt: true,
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Conversation = typeof conversations.$inferSelect;
export type InsertConversation = z.infer<typeof insertConversationSchema>;
export const projects = pgTable("projects", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  color: text("color").notNull(),
  description: text("description"),
});

export const notes = pgTable("notes", {
  id: varchar("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  projectId: varchar("project_id").references(() => projects.id),
  tags: text("tags").array(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const todos = pgTable("todos", {
  id: varchar("id").primaryKey(),
  text: text("text").notNull(),
  completed: integer("completed").default(0).notNull(),
  priority: text("priority").notNull(),
});

export const insertProjectSchema = createInsertSchema(projects);
export const insertNoteSchema = createInsertSchema(notes);
export const insertTodoSchema = createInsertSchema(todos);

export type Project = typeof projects.$inferSelect;
export type Note = typeof notes.$inferSelect;
export type Todo = typeof todos.$inferSelect;
