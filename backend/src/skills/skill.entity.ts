export enum SkillCategory {
  FRONTEND = 'frontend',
  BACKEND = 'backend',
  ML = 'ml',
  LANGUAGES = 'languages',
  TOOLS = 'tools',
  OS = 'os',
  CONCEPTS = 'concepts',
  PROFESSIONAL = 'professional',
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
}
