export enum ProjectCategory {
  WEB = 'web',
  ML = 'ml',
  RESEARCH = 'research',
  IOT = 'iot',
  DESKTOP = 'desktop',
  OTHER = 'other',
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  repo_url: string | null;
  live_url: string | null;
  image_url: string | null;
  category: ProjectCategory;
  featured: boolean;
  created_at: string;
}
