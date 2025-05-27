import { Test, TestingModule } from '@nestjs/testing';
import { ItemDoAcervoController } from './item-do-acervo.controller';
import { ItemDoAcervoService } from '../services/item-do-acervo.service';

describe('ItemDoAcervoController', () => {
  let controller: ItemDoAcervoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemDoAcervoController],
      providers: [ItemDoAcervoService],
    }).compile();

    controller = module.get<ItemDoAcervoController>(ItemDoAcervoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
