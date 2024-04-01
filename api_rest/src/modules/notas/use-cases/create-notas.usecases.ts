import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../../../database/PrismaService";
import { NotasDTO } from "../dto/notas.dto";
import { Notas, ItemPedido } from "@prisma/client";

@Injectable()
export class CreateNotaUseCases {
  constructor(private readonly prisma: PrismaService) {}

  async execute(data: NotasDTO): Promise<Notas> {
    const { id, itens } = data;
    
    try {
      // Verifica se a nota já está cadastrada
      const existingNota = await this.prisma.notas.findUnique({ where: { id } });
      if (existingNota) {
        throw new BadRequestException(`Nota fiscal ${id} já cadastrada`);
      }

      // Cria a nota fiscal
      const createdNotas = await this.prisma.notas.create({ data: { id } });

      // Processa os itens da nota fiscal
      await Promise.all(
        itens.map(async (nota_item) => {
          try {
            // Busca o item do pedido
            const pedido_item = await this.prisma.itemPedido.findFirst({
              where: {
                id_pedido: nota_item.id_pedido, 
                numero_item: nota_item.numero_item,
              }
            });

            if (!pedido_item) {
              throw new BadRequestException(`Item do pedido não encontrado para id_pedido: ${nota_item.id_pedido}`);
            }

            // Verifica se o item do pedido já foi atendido
            if (!pedido_item.pendente) {
              throw new BadRequestException(`O item do pedido ${pedido_item.id_pedido} já foi atendido`);
            }

            // Verifica se a quantidade atendida + quantidade do item é maior que a quantidade do item do pedido
            const quantidadeTotal = pedido_item.quantidade_atendida + nota_item.quantidade_produto;
            if (quantidadeTotal > pedido_item.quantidade_produto) {
              throw new BadRequestException(`A quantidade total ultrapassa a quantidade do item do pedido`);
            }

            // Atualiza o item do pedido
            await this.atualizarItemPedido(pedido_item, nota_item);

            // Cadastra o item do Notas
            await this.prisma.itemNota.create({ data: { ...nota_item, id_nota: createdNotas.id } });
          } catch (error) {
            throw new BadRequestException(error.message);
          }
        })
      );

      // Atualiza os saldos dos pedidos
      await this.atualizarSaldosPedidos(itens);

      // Retorna a nota fiscal criada com seus itens
      return await this.prisma.notas.findUnique({
        where: { id: createdNotas.id },
        include: { itens: true }
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async atualizarItemPedido(pedido_item: ItemPedido, nota_item: any): Promise<void> {
    pedido_item.quantidade_atendida += nota_item.quantidade_produto;
    pedido_item.pendente = pedido_item.quantidade_atendida === pedido_item.quantidade_produto ? false : true;
    await this.prisma.itemPedido.update({ where: { id: pedido_item.id }, data: pedido_item });
  }

  async atualizarSaldosPedidos(itens: any[]): Promise<void> {
    const atualizados = new Set<number>();
    await Promise.all(
      itens.map(async (nota_item) => {
        if (!atualizados.has(nota_item.id_pedido)) {
          const pedido = await this.prisma.pedido.findFirst({ where: { id: nota_item.id_pedido }, include: { itens: true } });
          const saldo_valor = pedido.itens.reduce((acc, item) => acc + (item.quantidade_atendida * item.valor_unitario_produto), 0);
          await this.prisma.pedido.update({ where: { id: pedido.id }, data: { saldo_valor } });
          atualizados.add(nota_item.id_pedido);
        }
      })
    );
  }
}
