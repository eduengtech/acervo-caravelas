import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ItemDoAcervoService } from '../services/item-do-acervo.service';
import { CreateItemDto } from '../dto/create-item.dto';
import { UpdateItemDto } from '../dto/update-item.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../../common/guards/roles.guards';
import { Roles } from '../../../common/decorators/roles.decorator';
import { User } from '../../../common/decorators/user.decorator';
import { Permissao } from '../../../../generated/prisma';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Item do Acervo')
@Controller('item-do-acervo')
export class ItemDoAcervoController {
  constructor(private readonly itemService: ItemDoAcervoService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Permissao.ADMIN, Permissao.EDITOR)
  @Post()
  @ApiOperation({ summary: 'Cria um novo item do acervo' })
  @ApiResponse({ status: 201, description: 'Item criado com sucesso' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @ApiBearerAuth()
  async create(@Body() dto: CreateItemDto, @User() user: any) {
    return this.itemService.create(dto, user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os itens do acervo (privado)' })
  async findAll() {
    return this.itemService.findAll();
  }

  @Get('public')
  @ApiOperation({ summary: 'Lista todos os itens públicos do acervo' })
  async findPublic() {
    return this.itemService.findPublic();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca item do acervo por ID' })
  async findOne(@Param('id') id: string) {
    return this.itemService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Permissao.ADMIN)
  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um item do acervo (ADMIN)' })
  @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() dto: UpdateItemDto) {
    return this.itemService.update(id, dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Permissao.ADMIN)
  @Patch(':id/publicar')
  @ApiOperation({ summary: 'Publica um item do acervo (ADMIN)' })
  @ApiBearerAuth()
  async publicar(@Param('id') id: string) {
    return this.itemService.publicar(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Permissao.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Remove um item do acervo (ADMIN)' })
  @ApiBearerAuth()
  async remove(@Param('id') id: string) {
    return this.itemService.remove(id);
  }
}
