import { Test, TestingModule } from '@nestjs/testing';
import { TipoDeItemService } from '../services/tipo-de-item.service';

describe('TipoDeItemService', () => {
  let service: TipoDeItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoDeItemService],
    }).compile();

    service = module.get<TipoDeItemService>(TipoDeItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
