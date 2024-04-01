import { IsString, IsNumber, IsBoolean, IsPositive, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class PedidoDTO {
  @IsString()
  id: string;

  itens: CriarItemPedidoDTO[]; // Alterado para CriarItemPedidoDTO

  static validarItens(data: CriarItemPedidoDTO[]): boolean {
    return PedidoDTO.validateNumeroItemSequencia(data) && this.validadeItensNumericos(data);
  }

  static validadeItensNumericos(data: CriarItemPedidoDTO[]): boolean {
    return data.every(item => item.quantidade_produto > 0 && item.valor_unitario_produto > 0);
  }

  static getValorTotal(itens: CriarItemPedidoDTO[]): number {
    return itens.reduce((acc, item) => acc + item.valor_unitario_produto * item.quantidade_produto, 0);
  }

  static validateNumeroItemSequencia(data: CriarItemPedidoDTO[]): boolean {
    const array = data.map(e => e.numero_item);
    const maiorValor = Math.max(...array);
    const conjuntoNumeros = Array.from({ length: maiorValor }, (_, i) => i + 1);

    return array.every((item, index) => item === conjuntoNumeros[index]);
  }
}


// item-pedido.dto.ts


export class CriarItemPedidoDTO {
  @IsNumber()
  numero_item: number;

  @IsString()
  codigo_produto: string;

  @IsNumber()
  @IsPositive()
  quantidade_produto: number;


  @IsNumber()
  @IsPositive()
  valor_unitario_produto: number;
}

