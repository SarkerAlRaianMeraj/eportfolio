import { Injectable, NotFoundException } from '@nestjs/common';
import { Project, ProjectCategory } from './project.entity';
import { CreateProjectDto } from './create-project.dto';
import { UpdateProjectDto } from './update-project.dto';

const seed: Project[] = [

  {
    id: '2',
    title: 'Pharmacy Management System',
    description:
      'Desktop system for managing medicine inventory, sales, and billing with efficient data handling using structured OOP modules and intuitive user interfaces for smooth workflow.',
    tech_stack: ['Java', 'OOP'],
    repo_url: 'https://github.com/SarkerAlRaianMeraj/-E-Pharamcy.git',
    live_url: null,
    image_url: null,
    category: ProjectCategory.DESKTOP,
    featured: true,
    created_at: '2024-09-01T00:00:00.000Z',
  },
  {
    id: '3',
    title: 'E-Portfolio Website',
    description:
      'Personal portfolio website built with Next.js and NestJS, featuring project showcases, blog, admin dashboard, and dark mode. Deployed on Vercel with PostgreSQL backend.',
    tech_stack: [
      'Next.js',
      'NestJS',
      'TypeScript',
      'PostgreSQL',
      'Tailwind CSS',
    ],
    repo_url: 'https://github.com/SarkerAlRaianMeraj/eportfolio.git',
    live_url: 'https://frontend-ten-zeta-41.vercel.app',
    image_url: null,
    category: ProjectCategory.WEB,
    featured: true,
    created_at: '2025-01-01T00:00:00.000Z',
  },
];

@Injectable()
export class ProjectsService {
  private projects: Project[] = [...seed];
  private nextId = 4;

  findAll(): Project[] {
    return [...this.projects];
  }

  findOne(id: string): Project {
    const project = this.projects.find((p) => p.id === id);
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return { ...project };
  }

  create(dto: CreateProjectDto): Project {
    const project: Project = {
      id: String(this.nextId++),
      title: dto.title,
      description: dto.description,
      tech_stack: dto.tech_stack ?? [],
      repo_url: dto.repo_url ?? null,
      live_url: dto.live_url ?? null,
      image_url: dto.image_url ?? null,
      category: dto.category ?? ProjectCategory.OTHER,
      featured: dto.featured ?? false,
      created_at: new Date().toISOString(),
    };
    this.projects.push(project);
    return { ...project };
  }

  update(id: string, dto: UpdateProjectDto): Project {
    const idx = this.projects.findIndex((p) => p.id === id);
    if (idx === -1) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    this.projects[idx] = { ...this.projects[idx], ...dto };
    return { ...this.projects[idx] };
  }

  remove(id: string): void {
    const idx = this.projects.findIndex((p) => p.id === id);
    if (idx === -1) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    this.projects.splice(idx, 1);
  }
}
