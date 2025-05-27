import { Test, TestingModule } from '@nestjs/testing';
import { ArquivoDigitalService } from '../arquivo-digital.service';
import { PrismaService } from '../../../prisma/service/prisma.service';

describe('ArquivoDigitalService', () => {
  let service: ArquivoDigitalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArquivoDigitalService, PrismaService],
    }).compile();

    service = module.get<ArquivoDigitalService>(ArquivoDigitalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
