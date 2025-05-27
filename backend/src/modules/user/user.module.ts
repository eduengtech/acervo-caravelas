import { Module } from '@nestjs/common';
import { UserService } from '../user/services/user.service';
import { UserController } from '../user/controllers/user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
