import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Research } from './research.entity';
import { CreateResearchDto } from './create-research.dto';
import { UpdateResearchDto } from './update-research.dto';

@Injectable()
export class ResearchService {
  constructor(
    @InjectRepository(Research)
    private researchRepository: Repository<Research>,
  ) {}

  async findAll(): Promise<Research[]> {
    return this.researchRepository.find({ order: { date: 'DESC' } });
  }

  async findOne(id: string): Promise<Research> {
    const research = await this.researchRepository.findOne({ where: { id } });
    if (!research) {
      throw new NotFoundException(`Research with ID ${id} not found`);
    }
    return research;
  }

  async create(createResearchDto: CreateResearchDto): Promise<Research> {
    const research = this.researchRepository.create(createResearchDto);
    return this.researchRepository.save(research);
  }

  async update(id: string, updateResearchDto: UpdateResearchDto): Promise<Research> {
    await this.researchRepository.update(id, updateResearchDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const research = await this.findOne(id);
    await this.researchRepository.remove(research);
  }
}
