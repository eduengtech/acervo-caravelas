import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../../modules/prisma/service/prisma.service';

interface JwtPayload {
  sub: string;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'defaultsecret',
    });
  }

  // Validação do JWT e inclusão da permissão
  async validate(payload: JwtPayload) {
    // Buscar usuário no banco de dados com o userId (payload.sub)
    const user = await this.prisma.usuario.findUnique({
      where: { id: payload.sub },
      select: { id: true, email: true, permissao: true },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return { userId: user.id, email: user.email, permissao: user.permissao };
  }
}
