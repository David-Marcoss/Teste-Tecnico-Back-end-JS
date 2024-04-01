import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/PrismaService';
import { PedidoDTO } from '../dto/pedido.dto';
import { Pedido } from '@prisma/client';

@Injectable()
export class CreatePedidoUseCases {
  constructor(private readonly prisma: PrismaService) {}

  async execute(data: PedidoDTO): Promise<Pedido> {
    const { id, itens } = data;

    if (
      itens == undefined ||
      itens.length == 0 ||
      !PedidoDTO.validarItens(itens)
    ) {
      throw new BadRequestException('Pedido com itens inválidos');
    }

    if (await this.prisma.pedido.findUnique({ where: { id } })) {
      throw new BadRequestException('Já existe um pedido com esse id');
    }

    let novoPedido: Pedido;

    try {
      novoPedido = await this.prisma.$transaction(async (prisma) => {
        const valor_total = PedidoDTO.getValorTotal(itens);
        const createdPedido = await prisma.pedido.create({
          data: {
            id,
            valor_total,
          },
        });

        await Promise.all(
          itens.map(async (item) => {
            try {
              await prisma.itemPedido.create({
                data: {
                  ...item,
                  id_pedido: createdPedido.id,
                },
              });
            } catch (error) {
              throw new BadRequestException('Erro ao criar um item do pedido');
            }
          }),
        );

        return createdPedido;
      });
    } catch (error) {
      throw new BadRequestException('Erro ao criar o pedido');
    }

    return await this.prisma.pedido.findUnique({
      where: { id: novoPedido.id },
      include: { itens: true },
    });
  }
}
