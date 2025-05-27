import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/service/prisma.service';
import { CreateUserDto } from '../dto/create-user';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from '../dto/update-user';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(data.senha, 10);

    return this.prisma.usuario.create({
      data: {
        nome: data.nome,
        email: data.email,
        senhaHash: hashedPassword,
        permissao: 'ADMIN', // ajuste conforme desejado
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.usuario.findUnique({
      where: { email },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.usuario.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return user;
  }

  async findAll() {
    return this.prisma.usuario.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        permissao: true,
      },
    });
  }

  async update(id: string, data: UpdateUserDto) {
    const user = await this.findOne(id);

    const updatedData: any = { ...data };

    if (data.senha) {
      updatedData.senhaHash = await bcrypt.hash(data.senha, 10);
      delete updatedData.senha;
    }

    return this.prisma.usuario.update({
      where: { id: user.id },
      data: updatedData,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.usuario.delete({ where: { id } });
  }
}
