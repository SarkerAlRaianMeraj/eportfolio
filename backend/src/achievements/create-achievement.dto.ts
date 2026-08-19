import { IsString, IsOptional, IsEnum } from 'class-validator';
import { AchievementType } from './achievement.entity';

export class CreateAchievementDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  date?: string;

  @IsEnum(AchievementType)
  @IsOptional()
  type?: AchievementType;
}
