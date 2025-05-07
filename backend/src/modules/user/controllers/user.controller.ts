import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guards';
import { CreateUserDto } from '../dto/create-user';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly usuarioService: UserService) {}

    @Post()
    async create(@Body() dto: CreateUserDto) {
      return this.usuarioService.create(dto);
    }

    
    @UseGuards(JwtAuthGuard)
    @Get('me')
    getMe(@Req()req) {
        return req.user;
    }

}
