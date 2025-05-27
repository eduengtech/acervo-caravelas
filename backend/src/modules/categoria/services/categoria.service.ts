import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/service/prisma.service';
import { CreateCategoriaDto } from '../dto/create-category.dto';
import { UpdateCategoriaDto } from '../dto/update-category.dto';
import { Categoria, Prisma } from '../../../../generated/prisma';

@Injectable()
export class CategoriaService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCategoriaDto) {
    return this.prisma.categoria.create({ data: dto });
  }

  async findAll(): Promise<Categoria[]> {
    return this.prisma.categoria.findMany();
  }

  async findOne(id: string) {
    const category = await this.prisma.categoria.findUnique({ where: { id } });

    if (!category) throw new NotFoundException('Categoria não encontrada');

    return category;
  }

  async update(id: string, dto: UpdateCategoriaDto) {
    await this.findOne(id);

    return this.prisma.categoria.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    try {
      return await this.prisma.categoria.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new BadRequestException(
          'Não é possível deletar a categoria pois ela está sendo usada.',
        );
      }
      throw error;
    }
  }
}
