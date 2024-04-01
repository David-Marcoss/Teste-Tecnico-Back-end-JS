import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { CreateNotaUseCases } from './use-cases/create-notas.usecases';
import { FindOneNotaUseCases } from './use-cases/findOne-notas.usecases';
import { FindAllNotaUseCases } from './use-cases/findAll-notas.usecases';

@Injectable()
export class NotasService {
  create = new CreateNotaUseCases(this.prisma);
  findAll = new FindAllNotaUseCases(this.prisma);
  findOne = new FindOneNotaUseCases(this.prisma);


  constructor(private prisma: PrismaService) {}
}
