import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../../../database/PrismaService";

import { Pedido } from "@prisma/client";

@Injectable()
export class FindOnePedidoUseCases {
    constructor(private readonly prisma: PrismaService){}

    async execute(id:string): Promise<Pedido> {
        const pedido = await this.prisma.pedido.findFirst({ where: { id }, include: { itens: true }});

        if (pedido == null) {
            throw new BadRequestException('Pedido não encontrado');
        }
        
        return pedido;
    }
}
