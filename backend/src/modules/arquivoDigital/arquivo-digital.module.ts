import { Module } from '@nestjs/common';
import { ArquivoDigitalController } from './controllers/arquivo-digital.controller';
import { ArquivoDigitalService } from './services/arquivo-digital.service';
import { PrismaService } from '../prisma/service/prisma.service';

@Module({
  controllers: [ArquivoDigitalController],
  providers: [ArquivoDigitalService, PrismaService],
})
export class ArquivoDigitalModule {}
