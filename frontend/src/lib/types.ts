export interface Project {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  repo_url?: string;
  live_url?: string;
  image_url?: string;
  category: 'web' | 'ml' | 'research' | 'iot' | 'other';
  featured: boolean;
  created_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'ml' | 'languages' | 'tools';
}

export interface Research {
  id: string;
  title: string;
  authors: string[];
  publication_venue?: string;
  date?: string;
  doi_url?: string;
  pdf_url?: string;
  abstract?: string;
  created_at: string;
}

export interface Achievement {
  id: string;
  title: string;
  description?: string;
  date?: string;
  type: 'award' | 'certification' | 'deans_list' | 'other';
  created_at: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface User {
  id: string;
  email: string;
}
