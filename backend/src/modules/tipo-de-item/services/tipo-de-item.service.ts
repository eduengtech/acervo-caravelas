import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/service/prisma.service';
import { CreateTipoDeItemDto } from '../dto/create-tipo-de-item.dto';
import { UpdateTipoDeItemDto } from '../dto/update-tipo-de-item.dto';

@Injectable()
export class TipoDeItemService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTipoDeItemDto) {
    return this.prisma.tipoDeItem.create({ data: dto });
  }

  async findAll() {
    return this.prisma.tipoDeItem.findMany();
  }

  async findOne(id: string) {
    const tipo = await this.prisma.tipoDeItem.findUnique({ where: { id } });

    if (!tipo) throw new NotFoundException('Tipo de item não encontrado');

    return tipo;
  }
  async update(id: string, dto: UpdateTipoDeItemDto) {
    await this.findOne(id);
    return this.prisma.tipoDeItem.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.tipoDeItem.delete({ where: { id } });
  }
}
