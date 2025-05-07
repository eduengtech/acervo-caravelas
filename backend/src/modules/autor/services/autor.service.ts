import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/service/prisma.service';
import { CreateAutorDto } from '../dto/create-autor.dto';
import { UpdateAutorDto } from '../dto/update-autor.dto';

@Injectable()
export class AutorService {
    constructor(private readonly prisma: PrismaService) {}
    
    async create(dto: CreateAutorDto) {
        const [year, month, day] = dto.dataNascimento.split('-').map(Number);
        const data = new Date(Date.UTC(year, month - 1, day));
      
        if (isNaN(data.getTime())) {
          throw new BadRequestException('dataNascimento inválida');
        }
      
        return this.prisma.autor.create({
          data: {
            nome: dto.nome,
            dataNascimento: data,
          },
        });
      }
      
    
    async findAll() {
        return this.prisma.autor.findMany({
          include: { itens: true },
        });
    }

    async findOne(id: string){
        const author = await this.prisma.autor.findUnique({where: {id}});

        if(!author) throw new NotFoundException ('Autor não Localizado');

        return author;
    }

    async update(id: string, dto: UpdateAutorDto){
        await this.findOne(id);

        try {
            return this.prisma.autor.update({where: {id}, data: dto});
          } catch (error) {
            throw new BadRequestException('Erro ao atualizar nome do autor');
        }
        
    }

    async remove(id: string){
        await this.findOne(id);

        return this.prisma.autor.delete({where: {id}});
    }
}
