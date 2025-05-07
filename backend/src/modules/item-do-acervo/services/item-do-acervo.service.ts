import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/service/prisma.service';
import { CreateItemDto } from '../dto/create-item.dto';
import { UpdateItemDto } from '../dto/update-item.dto';

@Injectable()
export class ItemDoAcervoService {
  constructor (private readonly prisma: PrismaService) {}

  async create(dto: CreateItemDto, userId: string) {
    const { titulo, descricao, autorId, categoriaId, tipoItemId, dataCriacao } = dto;
  
    return await this.prisma.itemDoAcervo.create({
      data: {
        titulo,
        descricao,
        autorId, // autorId pode ser opcional e será tratado na criação
        categoriaId,
        tipoItemId,  // Tipo de item
        criadoPorId: userId,  // Passando o userId (do JWT) corretamente para o campo criadoPorId
        dataCriacao: dataCriacao ? new Date(dataCriacao) : new Date(),  // Atribuindo dataCriacao se fornecido
      },
    });
  }
  
  
  async findAll() {
    return await this.prisma.itemDoAcervo.findMany({
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

  async findOne(id: string) {
    return await this.prisma.itemDoAcervo.findUnique({
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
  
  async update(id: string, data: UpdateItemDto) {
    const { dataCriacao, ...resto } = data;
  
    const updatedData: any = {
      ...resto,
      ...(dataCriacao && { dataCriacao: new Date(dataCriacao) }), // Só transforma quando necessário
    };
  
    return await this.prisma.itemDoAcervo.update({
      where: { id },
      data: updatedData,
    });
  }
  
  
    
  async remove(id: string) {
    return await this.prisma.itemDoAcervo.delete({
      where: { id },
    });
  }
  
}
