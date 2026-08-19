import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateResearchDto {
  @IsString()
  title: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  authors?: string[];

  @IsString()
  @IsOptional()
  publication_venue?: string;

  @IsString()
  @IsOptional()
  date?: string;

  @IsString()
  @IsOptional()
  doi_url?: string;

  @IsString()
  @IsOptional()
  pdf_url?: string;

  @IsString()
  @IsOptional()
  abstract?: string;
}
