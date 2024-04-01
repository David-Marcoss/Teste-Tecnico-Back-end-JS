import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../database/PrismaService";
import { Notas} from "@prisma/client";

@Injectable()
export class FindAllNotaUseCases {
  constructor(private readonly prisma: PrismaService) {}

  async execute(): Promise<Notas[]> {

    return await this.prisma.notas.findMany({ include: { itens: true } });
  }
}