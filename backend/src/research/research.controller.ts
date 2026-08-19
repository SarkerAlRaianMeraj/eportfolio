import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ResearchService } from './research.service';
import { CreateResearchDto } from './create-research.dto';
import { UpdateResearchDto } from './update-research.dto';

@Controller('research')
export class ResearchController {
  constructor(private readonly researchService: ResearchService) {}

  @Get()
  findAll() {
    return this.researchService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.researchService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createResearchDto: CreateResearchDto) {
    return this.researchService.create(createResearchDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateResearchDto: UpdateResearchDto) {
    return this.researchService.update(id, updateResearchDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.researchService.remove(id);
  }
}
