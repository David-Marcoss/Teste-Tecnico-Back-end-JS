import { Module } from '@nestjs/common';
import { NotasService } from './notas.service';
import { NotasController } from './notas.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [NotasController],
  providers: [NotasService,PrismaService],
})
export class NotasModule {}
