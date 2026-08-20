import { Injectable, NotFoundException } from '@nestjs/common';
import { Research } from './research.entity';
import { CreateResearchDto } from './create-research.dto';
import { UpdateResearchDto } from './update-research.dto';

const seed: Research[] = [
  {
    id: '1',
    title: 'Bangla Healthcare Technologies',
    authors: ['Sarker Al Raian Meraj'],
    publication_venue: 'AIUB Research',
    date: '2024-06-01',
    doi_url: null,
    pdf_url: null,
    abstract:
      'Research on Bangla healthcare technologies involving data collection, analysis, and experimentation to improve healthcare accessibility and technology adoption in Bangladesh.',
    created_at: '2024-06-01T00:00:00.000Z',
  },
];

@Injectable()
export class ResearchService {
  private items: Research[] = [...seed];
  private nextId = 2;

  findAll(): Research[] {
    return [...this.items];
  }

  findOne(id: string): Research {
    const item = this.items.find((r) => r.id === id);
    if (!item) {
      throw new NotFoundException(`Research with ID ${id} not found`);
    }
    return { ...item };
  }

  create(dto: CreateResearchDto): Research {
    const item: Research = {
      id: String(this.nextId++),
      title: dto.title,
      authors: dto.authors ?? [],
      publication_venue: dto.publication_venue ?? null,
      date: dto.date ?? null,
      doi_url: dto.doi_url ?? null,
      pdf_url: dto.pdf_url ?? null,
      abstract: dto.abstract ?? null,
      created_at: new Date().toISOString(),
    };
    this.items.push(item);
    return { ...item };
  }

  update(id: string, dto: UpdateResearchDto): Research {
    const idx = this.items.findIndex((r) => r.id === id);
    if (idx === -1) {
      throw new NotFoundException(`Research with ID ${id} not found`);
    }
    this.items[idx] = { ...this.items[idx], ...dto };
    return { ...this.items[idx] };
  }

  remove(id: string): void {
    const idx = this.items.findIndex((r) => r.id === id);
    if (idx === -1) {
      throw new NotFoundException(`Research with ID ${id} not found`);
    }
    this.items.splice(idx, 1);
  }
}
