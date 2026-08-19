import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum AchievementType {
  AWARD = 'award',
  CERTIFICATION = 'certification',
  DEANS_LIST = 'deans_list',
  OTHER = 'other',
}

@Entity('achievements')
export class Achievement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ type: 'date', nullable: true })
  date: string;

  @Column({
    type: 'enum',
    enum: AchievementType,
    default: AchievementType.OTHER,
  })
  type: AchievementType;

  @CreateDateColumn()
  created_at: Date;
}
