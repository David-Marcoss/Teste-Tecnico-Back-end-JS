import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { NotasService } from './notas.service';
import { NotasDTO } from './dto/notas.dto';

@Controller('api/v1/notas')
export class NotasController {
  constructor(private readonly notasService: NotasService) {}

  @Post()
  async create(@Body(new ValidationPipe()) data: NotasDTO) {
    return this.notasService.create.execute(data);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.notasService.findOne.execute(id);
  }

  @Get()
  async findAll() {
    return this.notasService.findAll.execute();
  }
}
