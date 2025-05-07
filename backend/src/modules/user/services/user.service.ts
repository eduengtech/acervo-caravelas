import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/modules/prisma/service/prisma.service";
import { CreateUserDto } from "../dto/create-user";
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from "../dto/update-user";
@Injectable()
export class UserService{
    constructor(private prisma: PrismaService){}

    async create(data: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(data.senha, 10);

        return this.prisma.usuario.create({
            data: {
                nome: data.nome,
                email: data.email,
                senhaHash: hashedPassword,
                permissao: 'ADMIN',
            },
        });
    };


    async findByEmail(email: string) {
        return this.prisma.usuario.findUnique({
          where: { email },
        });
    };

    async findOne(id: string) {
        const user = await this.prisma.usuario.findUnique({where: {id}});

        if(!user){
            throw new NotFoundException('Usuário não cadastrados ');
        }

        return user;
    };

    async update(id: string, data:UpdateUserDto){
        const user = await this.findOne(id);

        let updatedData = {...data};
        if (data.senha) {
            updatedData.senha = await bcrypt.hash(data.senha, 10);
        }

        return this.prisma.usuario.update({
            where: {id: user.id},
            data: updatedData,
        });
    };

    async remove(id: string){

        await this.findOne(id);
        
        return this.prisma.usuario.delete({ where: {id} });
    }
};
