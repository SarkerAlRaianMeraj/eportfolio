import { IsString, IsEnum } from 'class-validator';
import { SkillCategory } from './skill.entity';

export class CreateSkillDto {
  @IsString()
  name: string;

  @IsEnum(SkillCategory)
  category: SkillCategory;
}
