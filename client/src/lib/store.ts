import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Note, Project, Todo } from './types';

interface AppState {
  notes: Note[];
  projects: Project[];
  todos: Todo[];
  searchQuery: string;
  isLoading: boolean;
  
  addNote: (note: Note) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  
  addTodo: (todo: Todo) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  
  setSearchQuery: (query: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      notes: [],
      projects: [],
      todos: [],
      searchQuery: '',
      isLoading: false,

      addNote: (note) => {
        set((state) => ({ notes: [note, ...state.notes] }));
      },
      updateNote: (id, updates) => {
        set((state) => ({
          notes: state.notes.map((n) => (n.id === id ? { ...n, ...updates } : n)),
        }));
      },
      deleteNote: (id) => {
        set((state) => ({ notes: state.notes.filter((n) => n.id !== id) }));
      },

      addProject: (project) => {
        set((state) => ({ projects: [...state.projects, project] }));
      },
      deleteProject: (id) => {
        set((state) => ({ 
          projects: state.projects.filter((p) => p.id !== id),
          notes: state.notes.map(n => n.projectId === id ? { ...n, projectId: undefined } : n)
        }));
      },
      updateProject: (id, updates) => {
        set((state) => ({
          projects: state.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        }));
      },

      addTodo: (todo) => {
        set((state) => ({ todos: [...state.todos, todo] }));
      },
      toggleTodo: (id) => {
        set((state) => ({
          todos: state.todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
        }));
      },
      deleteTodo: (id) => {
        set((state) => ({ todos: state.todos.filter((t) => t.id !== id) }));
      },

      setSearchQuery: (query) => set({ searchQuery: query }),
    }),
    {
      name: 'project-mind-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
