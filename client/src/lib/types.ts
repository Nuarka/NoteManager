export interface Note {
  id: string;
  title: string;
  content: string; // HTML content from Tiptap
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  projectId?: string;
}

export interface Project {
  id: string;
  name: string;
  color: string;
  description?: string;
  longNote?: string;
  versions?: { ver: string; date: string; desc: string }[];
}

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface NewsItem {
  headline: string;
  summary: string;
  source: string;
}
