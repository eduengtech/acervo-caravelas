import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/service/prisma.service';

@Injectable()
export class ArquivoDigitalService {
  constructor(private readonly prisma: PrismaService) {}

  // 1. Criar arquivo digital
  async create(data: { itemId: string; url: string; tipo: string }) {
    return await this.prisma.arquivoDigital.create({ data });
  }

  // 2. Listar todos os arquivos digitais
  async findAll() {
    return await this.prisma.arquivoDigital.findMany({
      include: { item: true },
    });
  }

  // 3. Buscar um arquivo digital pelo ID (findOne/findById)
  async findOne(id: string) {
    const arquivo = await this.prisma.arquivoDigital.findUnique({
      where: { id },
      include: { item: true },
    });

    if (!arquivo) {
      throw new NotFoundException(`Arquivo com ID ${id} não encontrado.`);
    }

    return arquivo;
  }

  // 4. Busca especializada: buscar arquivos por itemId, se precisar
  async findByItemId(itemId: string) {
    return await this.prisma.arquivoDigital.findMany({
      where: { itemId },
      include: { item: true },
    });
  }

  // 5. Remover arquivo digital pelo ID
  async remove(id: string) {
    const arquivo = await this.prisma.arquivoDigital.findUnique({
      where: { id },
    });

    if (!arquivo) {
      throw new NotFoundException(`Arquivo com ID ${id} não encontrado.`);
    }

    return await this.prisma.arquivoDigital.delete({ where: { id } });
  }
}
