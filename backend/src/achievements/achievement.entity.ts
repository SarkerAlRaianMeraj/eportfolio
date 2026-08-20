export enum AchievementType {
  AWARD = 'award',
  CERTIFICATION = 'certification',
  DEANS_LIST = 'deans_list',
  COMPETITIVE = 'competitive',
  COMPETITION = 'competition',
  PROJECT = 'project',
  OTHER = 'other',
}

export interface Achievement {
  id: string;
  title: string;
  description: string | null;
  date: string | null;
  type: AchievementType;
  created_at: string;
}
