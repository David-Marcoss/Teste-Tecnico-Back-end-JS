import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { CreatePedidoUseCases } from './use-cases/create-pedido.usecases';
import { FindAllPedidoUseCases } from './use-cases/findAll-pedido.usecases';
import { FindOnePedidoUseCases } from './use-cases/findOne-pedido.usecases';
import { FindAllPedidosPendentesUseCases } from './use-cases/findAll-pedidos-pendentes.usecases';

@Injectable()
export class PedidosService {

    create = new CreatePedidoUseCases(this.prisma)
    findOne = new FindOnePedidoUseCases(this.prisma)
    findAll = new FindAllPedidoUseCases(this.prisma)
    findAllPendente = new FindAllPedidosPendentesUseCases(this.prisma)

    constructor(private prisma: PrismaService) { }
}

