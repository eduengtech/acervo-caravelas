import { Test, TestingModule } from '@nestjs/testing';
import { ItemDoAcervoController } from './item-do-acervo.controller';

describe('ItemDoAcervoController', () => {
  let controller: ItemDoAcervoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemDoAcervoController],
    }).compile();

    controller = module.get<ItemDoAcervoController>(ItemDoAcervoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
