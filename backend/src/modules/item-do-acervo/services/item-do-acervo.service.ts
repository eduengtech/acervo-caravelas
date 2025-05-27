import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/service/prisma.service';
import { CreateItemDto } from '../dto/create-item.dto';
import { UpdateItemDto } from '../dto/update-item.dto';

@Injectable()
export class ItemDoAcervoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateItemDto, userId: string) {
    const { titulo, descricao, autorId, categoriaId, tipoItemId, dataCriacao } =
      dto;

    return this.prisma.itemDoAcervo.create({
      data: {
        titulo,
        descricao,
        autorId,
        categoriaId,
        tipoItemId,
        criadoPorId: userId,
        dataCriacao: dataCriacao ? new Date(dataCriacao) : new Date(),
        publicado: false,
      },
    });
  }

  async findAll() {
    return this.prisma.itemDoAcervo.findMany({
      include: {
        autor: true,
        categoria: true,
        tipoItem: true,
        criadoPor: true,
        arquivos: true,
      },
      orderBy: { criadoEm: 'desc' },
    });
  }

  async findPublic() {
    return this.prisma.itemDoAcervo.findMany({
      where: { publicado: true },
      include: {
        autor: true,
        categoria: true,
        tipoItem: true,
        arquivos: true,
      },
      orderBy: { criadoEm: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.itemDoAcervo.findUnique({
      where: { id },
      include: {
        autor: true,
        categoria: true,
        tipoItem: true,
        criadoPor: true,
        arquivos: true,
      },
    });
  }

  async publicar(id: string) {
    return this.prisma.itemDoAcervo.update({
      where: { id },
      data: { publicado: true },
    });
  }

  async update(id: string, data: UpdateItemDto) {
    const { dataCriacao, ...resto } = data;

    const updatedData: any = {
      ...resto,
      ...(dataCriacao && { dataCriacao: new Date(dataCriacao) }),
    };

    return this.prisma.itemDoAcervo.update({
      where: { id },
      data: updatedData,
    });
  }

  async remove(id: string) {
    return this.prisma.itemDoAcervo.delete({
      where: { id },
    });
  }
}
