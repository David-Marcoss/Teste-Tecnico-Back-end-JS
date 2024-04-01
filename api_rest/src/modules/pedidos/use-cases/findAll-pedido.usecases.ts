import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../../../database/PrismaService";

import { Pedido } from "@prisma/client";

@Injectable()
export class FindAllPedidoUseCases {
    constructor(private readonly prisma: PrismaService){}

    async execute(): Promise<Pedido[]> {
        
        return await this.prisma.pedido.findMany({ include: { itens: true } });
    }
}
