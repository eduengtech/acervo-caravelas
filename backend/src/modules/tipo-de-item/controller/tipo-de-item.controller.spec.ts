import { Test, TestingModule } from '@nestjs/testing';
import { TipoDeItemController } from '../controller/tipo-de-item.controller';

describe('TipoDeItemController', () => {
  let controller: TipoDeItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoDeItemController],
    }).compile();

    controller = module.get<TipoDeItemController>(TipoDeItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
