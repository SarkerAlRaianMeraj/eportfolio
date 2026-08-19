import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('research')
export class Research {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('simple-array', { nullable: true })
  authors: string[];

  @Column({ nullable: true })
  publication_venue: string;

  @Column({ type: 'date', nullable: true })
  date: string;

  @Column({ nullable: true })
  doi_url: string;

  @Column({ nullable: true })
  pdf_url: string;

  @Column('text', { nullable: true })
  abstract: string;

  @CreateDateColumn()
  created_at: Date;
}
