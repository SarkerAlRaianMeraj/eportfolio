import {
  IsString,
  IsOptional,
  IsBoolean,
  IsEnum,
  IsArray,
} from 'class-validator';
import { ProjectCategory } from './project.entity';

export class CreateProjectDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tech_stack?: string[];

  @IsString()
  @IsOptional()
  repo_url?: string;

  @IsString()
  @IsOptional()
  live_url?: string;

  @IsString()
  @IsOptional()
  image_url?: string;

  @IsEnum(ProjectCategory)
  @IsOptional()
  category?: ProjectCategory;

  @IsBoolean()
  @IsOptional()
  featured?: boolean;
}
