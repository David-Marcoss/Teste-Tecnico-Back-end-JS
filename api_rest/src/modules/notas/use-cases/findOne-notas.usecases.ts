import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../../../database/PrismaService";
import { Notas} from "@prisma/client";

@Injectable()
export class FindOneNotaUseCases {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id:string): Promise<Notas> {

    const nota = await this.prisma.notas.findUnique({ where: { id }, include: { itens: true }});
    if (nota == null) {
      throw new BadRequestException('Nota não encontrada');
    }

    return nota;
  }
}