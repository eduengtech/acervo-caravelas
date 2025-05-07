import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { ItemDoAcervoModule } from './modules/item-do-acervo/item-do-acervo.module';
import { TipoDeItemModule } from './modules/tipo-de-item/tipo-de-item.module';
import { CategoriaModule } from './modules/categoria/categoria.module';
import { AutorModule } from './modules/autor/autor.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [PrismaModule, AuthModule, ItemDoAcervoModule, TipoDeItemModule, CategoriaModule, AutorModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
