import { Test, TestingModule } from '@nestjs/testing';
import { ItemDoAcervoService } from '../item-do-acervo.service';
import { PrismaService } from '../../../prisma/service/prisma.service';

describe('ItemDoAcervoService', () => {
  let service: ItemDoAcervoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemDoAcervoService, PrismaService],
    }).compile();

    service = module.get<ItemDoAcervoService>(ItemDoAcervoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
