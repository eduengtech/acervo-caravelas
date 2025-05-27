import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../../user/services/user.service';
import { RegisterDto } from '../dto/register.dto';
import { PrismaService } from '../../prisma/service/prisma.service';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async register(data: RegisterDto) {
    const senhaHash = await bcrypt.hash(data.senha, 10);
    const user = await this.prisma.usuario.create({
      data: {
        email: data.email,  
        nome: data.nome,
        senhaHash: senhaHash,
        permissao: 'ADMIN',
      },
    });

    return {
      id: user.id,
      email: user.email,
      nome: user.nome,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const passwordValid = await bcrypt.compare(password, user.senhaHash);
    if (!passwordValid) {
      throw new UnauthorizedException('Senha incorreta');
    }

    return user;
  }

  async login(data: LoginDto) {
    const user = await this.prisma.usuario.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const senhaValida = await bcrypt.compare(data.senha, user.senhaHash);

    if (!senhaValida) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      permissao: user.permissao,
    };
    const token = await this.jwtService.signAsync(payload);

    return { access_token: token };
  }
}
