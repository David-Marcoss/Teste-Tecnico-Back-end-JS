import { PedidosService } from './pedidos.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { PedidoDTO } from './dto/pedido.dto';

@Controller('api/v1/pedidos')
export class PedidosController {
  constructor(private readonly PedidosService: PedidosService) {}

  @Post()
  async create(@Body(new ValidationPipe()) data: PedidoDTO) {
    return this.PedidosService.create.execute(data);
  }

  @Get()
  async findAll(
    @Query('pendente') pendente?: boolean,
  ) {

    if(pendente) {
      return this.PedidosService.findAllPendente.execute();
    }
    
    return this.PedidosService.findAll.execute();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.PedidosService.findOne.execute(id);
  }

}
