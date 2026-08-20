import { Injectable, NotFoundException } from '@nestjs/common';
import { Skill, SkillCategory } from './skill.entity';
import { CreateSkillDto } from './create-skill.dto';
import { UpdateSkillDto } from './update-skill.dto';

const seed: Skill[] = [
  // Frontend
  { id: '1', name: 'React.js', category: SkillCategory.FRONTEND },
  { id: '2', name: 'Next.js', category: SkillCategory.FRONTEND },
  { id: '3', name: 'TypeScript', category: SkillCategory.FRONTEND },
  { id: '4', name: 'Tailwind CSS', category: SkillCategory.FRONTEND },
  { id: '5', name: 'HTML', category: SkillCategory.FRONTEND },
  { id: '6', name: 'CSS', category: SkillCategory.FRONTEND },
  // Backend
  { id: '7', name: 'NestJS', category: SkillCategory.BACKEND },
  { id: '8', name: 'REST API Development', category: SkillCategory.BACKEND },
  { id: '9', name: 'PostgreSQL', category: SkillCategory.BACKEND },
  { id: '10', name: 'Oracle', category: SkillCategory.BACKEND },
  { id: '11', name: 'SQL', category: SkillCategory.BACKEND },
  { id: '12', name: 'File Systems', category: SkillCategory.BACKEND },
  // Languages
  { id: '13', name: 'Python', category: SkillCategory.LANGUAGES },
  { id: '14', name: 'Java', category: SkillCategory.LANGUAGES },
  { id: '15', name: 'C++', category: SkillCategory.LANGUAGES },
  { id: '16', name: 'JavaScript', category: SkillCategory.LANGUAGES },
  { id: '17', name: 'C#', category: SkillCategory.LANGUAGES },
  { id: '18', name: 'R', category: SkillCategory.LANGUAGES },
  { id: '19', name: 'PHP', category: SkillCategory.LANGUAGES },
  // ML
  { id: '20', name: 'Machine Learning', category: SkillCategory.ML },
  { id: '21', name: 'Natural Language Processing', category: SkillCategory.ML },
  { id: '22', name: 'Statistical Analysis (R)', category: SkillCategory.ML },
  { id: '23', name: 'Data Visualization', category: SkillCategory.ML },
  { id: '24', name: 'Data Preprocessing', category: SkillCategory.ML },
  // Tools
  { id: '25', name: 'Git', category: SkillCategory.TOOLS },
  { id: '26', name: 'GitHub', category: SkillCategory.TOOLS },
  { id: '27', name: 'VS Code', category: SkillCategory.TOOLS },
  { id: '28', name: 'Visual Studio', category: SkillCategory.TOOLS },
  { id: '29', name: 'MATLAB', category: SkillCategory.TOOLS },
  { id: '30', name: 'RStudio', category: SkillCategory.TOOLS },
  { id: '31', name: 'XAMPP', category: SkillCategory.TOOLS },
  { id: '32', name: 'AutoCAD', category: SkillCategory.TOOLS },
  { id: '33', name: 'Cisco Packet Tracer', category: SkillCategory.TOOLS },
  { id: '34', name: 'Code::Blocks', category: SkillCategory.TOOLS },
  // OS
  { id: '35', name: 'Windows', category: SkillCategory.OS },
  { id: '36', name: 'Linux', category: SkillCategory.OS },
  // Concepts
  { id: '37', name: 'OOP', category: SkillCategory.CONCEPTS },
  {
    id: '38',
    name: 'Data Structures & Algorithms',
    category: SkillCategory.CONCEPTS,
  },
  { id: '39', name: 'DBMS', category: SkillCategory.CONCEPTS },
  { id: '40', name: 'Software Engineering', category: SkillCategory.CONCEPTS },
  { id: '41', name: 'API Integration', category: SkillCategory.CONCEPTS },
  { id: '42', name: 'Debugging', category: SkillCategory.CONCEPTS },
  { id: '43', name: 'C++ with GLUT/OpenGL', category: SkillCategory.CONCEPTS },
  {
    id: '44',
    name: 'AI-Assisted Development',
    category: SkillCategory.CONCEPTS,
  },
  // Professional
  { id: '45', name: 'Agile/Scrum', category: SkillCategory.PROFESSIONAL },
  { id: '46', name: 'SDLC Management', category: SkillCategory.PROFESSIONAL },
  {
    id: '47',
    name: 'Technical Documentation',
    category: SkillCategory.PROFESSIONAL,
  },
  {
    id: '48',
    name: 'Professional English Communication',
    category: SkillCategory.PROFESSIONAL,
  },
];

@Injectable()
export class SkillsService {
  private skills: Skill[] = [...seed];
  private nextId = 49;

  findAll(): Skill[] {
    return [...this.skills];
  }

  findOne(id: string): Skill {
    const skill = this.skills.find((s) => s.id === id);
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
    return { ...skill };
  }

  create(dto: CreateSkillDto): Skill {
    const skill: Skill = {
      id: String(this.nextId++),
      name: dto.name,
      category: dto.category,
    };
    this.skills.push(skill);
    return { ...skill };
  }

  update(id: string, dto: UpdateSkillDto): Skill {
    const idx = this.skills.findIndex((s) => s.id === id);
    if (idx === -1) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
    this.skills[idx] = { ...this.skills[idx], ...dto };
    return { ...this.skills[idx] };
  }

  remove(id: string): void {
    const idx = this.skills.findIndex((s) => s.id === id);
    if (idx === -1) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
    this.skills.splice(idx, 1);
  }
}
