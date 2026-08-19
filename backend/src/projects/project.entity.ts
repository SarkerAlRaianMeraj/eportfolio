import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum ProjectCategory {
  WEB = 'web',
  ML = 'ml',
  RESEARCH = 'research',
  IOT = 'iot',
  OTHER = 'other',
}

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('simple-array', { nullable: true })
  tech_stack: string[];

  @Column({ nullable: true })
  repo_url: string;

  @Column({ nullable: true })
  live_url: string;

  @Column({ nullable: true })
  image_url: string;

  @Column({
    type: 'enum',
    enum: ProjectCategory,
    default: ProjectCategory.OTHER,
  })
  category: ProjectCategory;

  @Column({ default: false })
  featured: boolean;

  @CreateDateColumn()
  created_at: Date;
}
