import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Research } from './research.entity';
import { ResearchService } from './research.service';
import { ResearchController } from './research.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Research])],
  controllers: [ResearchController],
  providers: [ResearchService],
  exports: [ResearchService],
})
export class ResearchModule {}
