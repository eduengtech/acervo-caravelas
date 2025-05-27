import { Test, TestingModule } from '@nestjs/testing';
import { TipoDeItemController } from '../controller/tipo-de-item.controller';
import { TipoDeItemService } from '../services/tipo-de-item.service';

describe('TipoDeItemController', () => {
  let controller: TipoDeItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoDeItemController],
      providers: [TipoDeItemService],
    }).compile();

    controller = module.get<TipoDeItemController>(TipoDeItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
