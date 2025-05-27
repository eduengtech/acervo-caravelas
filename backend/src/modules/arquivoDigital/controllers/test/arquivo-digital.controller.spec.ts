import { Test, TestingModule } from '@nestjs/testing';
import { ArquivoDigitalController } from '../arquivo-digital.controller';
import { ArquivoDigitalService } from '../../services/arquivo-digital.service';
import { BadRequestException } from '@nestjs/common';

describe('ArquivoDigitalController', () => {
  let controller: ArquivoDigitalController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let service: ArquivoDigitalService;

  const mockArquivoDigitalService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findByItemId: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArquivoDigitalController],
      providers: [
        {
          provide: ArquivoDigitalService,
          useValue: mockArquivoDigitalService,
        },
      ],
    }).compile();

    controller = module.get<ArquivoDigitalController>(ArquivoDigitalController);
    service = module.get<ArquivoDigitalService>(ArquivoDigitalService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('deve retornar todos os arquivos digitais', async () => {
      const result = [{ id: 'uuid1' }, { id: 'uuid2' }];
      mockArquivoDigitalService.findAll.mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
      expect(mockArquivoDigitalService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('deve retornar um arquivo pelo id', async () => {
      const id = 'uuid1';
      const result = { id };
      mockArquivoDigitalService.findOne.mockResolvedValue(result);

      expect(await controller.findOne(id)).toBe(result);
      expect(mockArquivoDigitalService.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('findByItem', () => {
    it('deve retornar arquivos por itemId', async () => {
      const itemId = 'item-uuid';
      const result = [{ id: 'a1' }, { id: 'a2' }];
      mockArquivoDigitalService.findByItemId.mockResolvedValue(result);

      expect(await controller.findByItem(itemId)).toBe(result);
      expect(mockArquivoDigitalService.findByItemId).toHaveBeenCalledWith(
        itemId,
      );
    });
  });

  describe('remove', () => {
    it('deve remover um arquivo pelo id', async () => {
      const id = 'uuid1';
      const result = { id };
      mockArquivoDigitalService.remove.mockResolvedValue(result);

      expect(await controller.remove(id)).toBe(result);
      expect(mockArquivoDigitalService.remove).toHaveBeenCalledWith(id);
    });
  });

  describe('upload', () => {
    it('deve fazer upload do arquivo e retornar os dados criados', async () => {
      const file = {
        originalname: 'documento.pdf',
        filename: '1234567890-documento.pdf',
      } as Express.Multer.File;

      const body = {
        itemId: 'item-uuid',
        titulo: 'Documento Histórico',
      };

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const req = {
        protocol: 'http',
        get: () => 'localhost:3333',
      } as any;

      const expectedUrl =
        'http://localhost:3333/uploads/1234567890-documento.pdf';
      const expectedTipo = 'application/pdf';

      const created = {
        id: 'uuid-arquivo',
        itemId: body.itemId,
        url: expectedUrl,
        tipo: expectedTipo,
      };

      mockArquivoDigitalService.create.mockResolvedValue(created);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const response = await controller.upload(file, body, req);

      expect(response).toEqual(created);
      expect(mockArquivoDigitalService.create).toHaveBeenCalledWith({
        ...body,
        url: expectedUrl,
        tipo: expectedTipo,
      });
    });

    it('deve lançar exceção se nenhum arquivo for enviado', async () => {
      await expect(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        controller.upload(undefined as any, {} as any, {} as any),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
