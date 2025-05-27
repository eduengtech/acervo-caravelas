import { Module } from '@nestjs/common';
import { TipoDeItemController } from './controller/tipo-de-item.controller';
import { TipoDeItemService } from './services/tipo-de-item.service';

@Module({
  controllers: [TipoDeItemController],
  providers: [TipoDeItemService],
})
export class TipoDeItemModule {}
