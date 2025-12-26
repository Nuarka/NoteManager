import { create } from 'zustand';
import { Note, Project, Todo } from './types';
import { subDays } from 'date-fns';

interface AppState {
  notes: Note[];
  projects: Project[];
  todos: Todo[];
  searchQuery: string;
  
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

// Mock Data
const MOCK_PROJECTS: Project[] = [
  { id: '1', name: 'Website Redesign', color: 'hsl(217, 89%, 61%)', description: 'Q1 Redesign project' },
  { id: '2', name: 'Marketing Campaign', color: 'hsl(0, 85%, 60%)', description: 'Social media blitz' },
  { id: '3', name: 'Personal Goals', color: 'hsl(146, 70%, 40%)', description: '2025 Resolutions' },
];

const MOCK_NOTES: Note[] = [
  { 
    id: '1', 
    title: 'Meeting Notes: Design Sync', 
    content: '<p>Discussed the new typography system. <strong>Action items:</strong> Update CSS variables.</p>', 
    createdAt: new Date(), 
    updatedAt: new Date(),
    tags: ['meeting', 'design'],
    projectId: '1'
  },
  { 
    id: '2', 
    title: 'Ideas for Logo', 
    content: '<p>Thinking about using a <em>bird</em> icon or something abstract.</p>', 
    createdAt: subDays(new Date(), 1), 
    updatedAt: subDays(new Date(), 1),
    tags: ['brainstorm'],
    projectId: '1'
  },
  { 
    id: '3', 
    title: 'Grocery List', 
    content: '<ul><li>Milk</li><li>Eggs</li><li>Bread</li></ul>', 
    createdAt: subDays(new Date(), 2), 
    updatedAt: subDays(new Date(), 2),
    tags: ['personal'],
    projectId: '3'
  },
];

const MOCK_TODOS: Todo[] = [
  { id: '1', text: 'Review PR #123', completed: false, priority: 'high' },
  { id: '2', text: 'Email client', completed: true, priority: 'medium' },
  { id: '3', text: 'Update documentation', completed: false, priority: 'low' },
  { id: '4', text: 'Buy coffee', completed: false, priority: 'high' },
];

export const useStore = create<AppState>((set) => ({
  notes: MOCK_NOTES,
  projects: MOCK_PROJECTS,
  todos: MOCK_TODOS,
  searchQuery: '',

  addNote: (note) => set((state) => ({ notes: [note, ...state.notes] })),
  updateNote: (id, updates) => set((state) => ({
    notes: state.notes.map((n) => (n.id === id ? { ...n, ...updates } : n)),
  })),
  deleteNote: (id) => set((state) => ({ notes: state.notes.filter((n) => n.id !== id) })),

  addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
  deleteProject: (id) => set((state) => ({ 
    projects: state.projects.filter((p) => p.id !== id),
    notes: state.notes.map(n => n.projectId === id ? { ...n, projectId: undefined } : n)
  })),

  updateProject: (id, updates) => set((state) => ({
    projects: state.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
  })),

  addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
  toggleTodo: (id) => set((state) => ({
    todos: state.todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
  })),
  deleteTodo: (id) => set((state) => ({ todos: state.todos.filter((t) => t.id !== id) })),

  setSearchQuery: (query) => set({ searchQuery: query }),
}));
