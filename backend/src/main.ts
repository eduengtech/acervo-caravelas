import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Necessário para transformar tipos automaticamente
    whitelist: true, // Remove propriedades não esperadas
    forbidNonWhitelisted: true, // Garante que não há propriedades extra
  })
);
  await app.listen(process.env.PORT ?? 3333);
}
bootstrap();
