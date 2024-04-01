import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../../../database/PrismaService";

import { Pedido } from "@prisma/client";

@Injectable()
export class FindAllPedidosPendentesUseCases {
    constructor(private readonly prisma: PrismaService){}

    async execute(): Promise<Pedido[]> {
        
        return await this.prisma.pedido.findMany({
            where: {
              itens: {
                some: {
                  pendente: true
                }
              }
            },
            include: {
              itens: {
                where: {
                  pendente: true
                }
              }
            }
          });
          
    }
}
