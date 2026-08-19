import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum SkillCategory {
  FRONTEND = 'frontend',
  BACKEND = 'backend',
  ML = 'ml',
  LANGUAGES = 'languages',
  TOOLS = 'tools',
}

@Entity('skills')
export class Skill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: SkillCategory,
  })
  category: SkillCategory;
}
