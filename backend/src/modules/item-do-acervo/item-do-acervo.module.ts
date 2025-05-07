import { Module } from '@nestjs/common';
import { ItemDoAcervoController } from './controllers/item-do-acervo.controller';
import { ItemDoAcervoService } from './services/item-do-acervo.service';

@Module({
    controllers: [ItemDoAcervoController],
    providers: [ItemDoAcervoService],
    exports: [ItemDoAcervoService],
})
export class ItemDoAcervoModule {}
