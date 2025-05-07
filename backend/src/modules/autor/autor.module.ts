import { Module } from '@nestjs/common';
import { AutorController } from './controllers/autor.controller';
import { AutorService } from './services/autor.service';

@Module({
  controllers: [AutorController],
  providers: [AutorService]
})
export class AutorModule {}
