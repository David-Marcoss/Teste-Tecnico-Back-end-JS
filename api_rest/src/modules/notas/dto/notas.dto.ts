import {
  IsUUID,
  IsString,
  IsInt,
  IsBoolean,
  ValidateNested,
  IsPositive,
  IsOptional,
} from 'class-validator';

export class ItemNotaDTO {

  @IsString()
  id_pedido: string;

  @IsInt()
  @IsPositive()
  numero_item: number;

  @IsInt()
  @IsPositive()
  quantidade_produto: number;

}

export class NotasDTO {
  @IsString()
  id: string;

  @ValidateNested({ each: true })
  itens: ItemNotaDTO[];
}
