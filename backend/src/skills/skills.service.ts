import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from './skill.entity';
import { CreateSkillDto } from './create-skill.dto';
import { UpdateSkillDto } from './update-skill.dto';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private skillsRepository: Repository<Skill>,
  ) {}

  async findAll(): Promise<Skill[]> {
    return this.skillsRepository.find({ order: { category: 'ASC', name: 'ASC' } });
  }

  async create(createSkillDto: CreateSkillDto): Promise<Skill> {
    const skill = this.skillsRepository.create(createSkillDto);
    return this.skillsRepository.save(skill);
  }

  async update(id: string, updateSkillDto: UpdateSkillDto): Promise<Skill> {
    await this.skillsRepository.update(id, updateSkillDto);
    const skill = await this.skillsRepository.findOne({ where: { id } });
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
    return skill;
  }

  async remove(id: string): Promise<void> {
    await this.skillsRepository.delete(id);
  }
}
