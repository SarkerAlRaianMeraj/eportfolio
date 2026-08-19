import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Achievement } from './achievement.entity';
import { CreateAchievementDto } from './create-achievement.dto';
import { UpdateAchievementDto } from './update-achievement.dto';

@Injectable()
export class AchievementsService {
  constructor(
    @InjectRepository(Achievement)
    private achievementsRepository: Repository<Achievement>,
  ) {}

  async findAll(): Promise<Achievement[]> {
    return this.achievementsRepository.find({ order: { date: 'DESC' } });
  }

  async findOne(id: string): Promise<Achievement> {
    const achievement = await this.achievementsRepository.findOne({ where: { id } });
    if (!achievement) {
      throw new NotFoundException(`Achievement with ID ${id} not found`);
    }
    return achievement;
  }

  async create(createAchievementDto: CreateAchievementDto): Promise<Achievement> {
    const achievement = this.achievementsRepository.create(createAchievementDto);
    return this.achievementsRepository.save(achievement);
  }

  async update(id: string, updateAchievementDto: UpdateAchievementDto): Promise<Achievement> {
    await this.achievementsRepository.update(id, updateAchievementDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const achievement = await this.findOne(id);
    await this.achievementsRepository.remove(achievement);
  }
}
