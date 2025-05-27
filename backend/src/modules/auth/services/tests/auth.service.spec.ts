import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../../user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../prisma/service/prisma.service';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let mockUserService: jest.Mocked<Partial<UserService>>;
  let mockJwtService: jest.Mocked<Partial<JwtService>>;
  let mockPrismaService: jest.Mocked<Partial<PrismaService>>;

  beforeEach(async () => {
    mockUserService = {
      findByEmail: jest.fn(),
    };

    mockJwtService = {
      signAsync: jest.fn(),
    };

    mockPrismaService = {
      usuario: {
        create: jest.fn(),
        findUnique: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: mockUserService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('register', () => {
    it('deve criar um novo usuário com hash de senha', async () => {
      const dto = {
        email: 'test@example.com',
        nome: 'Teste',
        senha: 'senha123',
      };

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      mockPrismaService.usuario!.create.mockResolvedValue({
        id: 'uuid1',
        email: dto.email,
        nome: dto.nome,
      });

      const result = await service.register(dto);

      expect(result).toEqual({
        id: 'uuid1',
        email: dto.email,
        nome: dto.nome,
      });

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockPrismaService.usuario!.create).toHaveBeenCalledWith(
        expect.objectContaining({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          data: expect.objectContaining({
            email: dto.email,
            nome: dto.nome,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            senhaHash: expect.any(String),
            permissao: 'ADMIN',
          }),
        }),
      );
    });
  });

  describe('validateUser', () => {
    it('deve validar usuário com senha correta', async () => {
      const senha = await bcrypt.hash('senha123', 10);
      const user = { email: 'user@mail.com', senhaHash: senha };

      mockUserService.findByEmail!.mockResolvedValue(user);

      const result = await service.validateUser(user.email, 'senha123');
      expect(result).toBe(user);
    });

    it('deve lançar erro se usuário não existir', async () => {
      mockUserService.findByEmail!.mockResolvedValue(null);

      await expect(
        service.validateUser('inexistente@mail.com', 'qualquer'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('deve lançar erro se senha estiver incorreta', async () => {
      const senha = await bcrypt.hash('senha123', 10);
      const user = { email: 'user@mail.com', senhaHash: senha };

      mockUserService.findByEmail!.mockResolvedValue(user);

      await expect(
        service.validateUser(user.email, 'senhaErrada'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('login', () => {
    it('deve retornar um token válido para credenciais corretas', async () => {
      const senha = await bcrypt.hash('senha123', 10);
      const user = {
        id: 'user-id',
        email: 'user@mail.com',
        senhaHash: senha,
        permissao: 'ADMIN',
      };

      mockPrismaService.usuario!.findUnique.mockResolvedValue(user);
      mockJwtService.signAsync!.mockResolvedValue('token-fake');

      const result = await service.login({
        email: user.email,
        senha: 'senha123',
      });

      expect(result).toEqual({ access_token: 'token-fake' });
    });

    it('deve lançar erro para e-mail inválido', async () => {
      mockPrismaService.usuario!.findUnique.mockResolvedValue(null);

      await expect(
        service.login({ email: 'email@invalido.com', senha: 'senha' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('deve lançar erro para senha incorreta', async () => {
      const senha = await bcrypt.hash('correta', 10);
      const user = {
        id: 'id',
        email: 'mail@test.com',
        senhaHash: senha,
        permissao: 'ADMIN',
      };

      mockPrismaService.usuario!.findUnique.mockResolvedValue(user);

      await expect(
        service.login({ email: user.email, senha: 'errada' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
