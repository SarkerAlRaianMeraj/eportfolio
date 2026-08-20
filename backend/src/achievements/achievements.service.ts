import { Injectable, NotFoundException } from '@nestjs/common';
import { Achievement, AchievementType } from './achievement.entity';
import { CreateAchievementDto } from './create-achievement.dto';
import { UpdateAchievementDto } from './update-achievement.dto';

const seed: Achievement[] = [
  {
    id: '1',
    title: 'Codeforces Rating: 1200+',
    description:
      'Solved 1000+ problems across Codeforces, LightOJ, and other competitive programming platforms.',
    date: '2024-12-01',
    type: AchievementType.COMPETITIVE,
    created_at: '2024-12-01T00:00:00.000Z',
  },
  {
    id: '2',
    title: 'ICPC & NCPC Participant',
    description:
      'Participated in International Collegiate Programming Contest (ICPC) and National Collegiate Programming Contest (NCPC).',
    date: '2024-10-01',
    type: AchievementType.COMPETITION,
    created_at: '2024-10-01T00:00:00.000Z',
  },
  {
    id: '3',
    title: 'Cisco IT Essentials Certification',
    description:
      'Earned Cisco IT Essentials certification covering computer hardware, software, networking fundamentals, and troubleshooting.',
    date: '2024-03-01',
    type: AchievementType.CERTIFICATION,
    created_at: '2024-03-01T00:00:00.000Z',
  },
  {
    id: '4',
    title: '2 Major Software Projects',
    description:
      'Successfully developed and delivered two major software projects: Hostel Management System and Pharmacy Management System.',
    date: '2024-09-01',
    type: AchievementType.PROJECT,
    created_at: '2024-09-01T00:00:00.000Z',
  },
];

@Injectable()
export class AchievementsService {
  private items: Achievement[] = [...seed];
  private nextId = 5;

  findAll(): Achievement[] {
    return [...this.items];
  }

  findOne(id: string): Achievement {
    const item = this.items.find((a) => a.id === id);
    if (!item) {
      throw new NotFoundException(`Achievement with ID ${id} not found`);
    }
    return { ...item };
  }

  create(dto: CreateAchievementDto): Achievement {
    const item: Achievement = {
      id: String(this.nextId++),
      title: dto.title,
      description: dto.description ?? null,
      date: dto.date ?? null,
      type: dto.type ?? AchievementType.OTHER,
      created_at: new Date().toISOString(),
    };
    this.items.push(item);
    return { ...item };
  }

  update(id: string, dto: UpdateAchievementDto): Achievement {
    const idx = this.items.findIndex((a) => a.id === id);
    if (idx === -1) {
      throw new NotFoundException(`Achievement with ID ${id} not found`);
    }
    this.items[idx] = { ...this.items[idx], ...dto };
    return { ...this.items[idx] };
  }

  remove(id: string): void {
    const idx = this.items.findIndex((a) => a.id === id);
    if (idx === -1) {
      throw new NotFoundException(`Achievement with ID ${id} not found`);
    }
    this.items.splice(idx, 1);
  }
}
