import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TipoDeItemService } from '../services/tipo-de-item.service';
import { CreateTipoDeItemDto } from '../dto/create-tipo-de-item.dto';
import { UpdateTipoDeItemDto } from '../dto/update-tipo-de-item.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../../common/guards/roles.guards';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Permissao } from '../../../../generated/prisma';

@ApiTags('Tipos de Item')
@Controller('tipo-de-item')
export class TipoDeItemController {
  constructor(private readonly service: TipoDeItemService) {}

  /**
   * Rotas públicas
   */

  @Get()
  @ApiOperation({ summary: 'Lista todos os tipos de item (público)' })
  @ApiResponse({
    status: 200,
    description: 'Lista de tipos de item retornada com sucesso.',
  })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um tipo de item por ID (público)' })
  @ApiParam({ name: 'id', description: 'UUID do tipo de item' })
  @ApiResponse({ status: 200, description: 'Tipo de item encontrado.' })
  @ApiResponse({ status: 404, description: 'Tipo de item não encontrado.' })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.findOne(id);
  }

  /**
   * Rotas protegidas
   */

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Permissao.ADMIN, Permissao.EDITOR)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Cria um novo tipo de item (admin/editor)' })
  @ApiResponse({ status: 201, description: 'Tipo de item criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() dto: CreateTipoDeItemDto) {
    return this.service.create(dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Permissao.ADMIN, Permissao.EDITOR)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um tipo de item (admin/editor)' })
  @ApiParam({ name: 'id', description: 'UUID do tipo de item' })
  @ApiResponse({
    status: 200,
    description: 'Tipo de item atualizado com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Tipo de item não encontrado.' })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateTipoDeItemDto,
  ) {
    return this.service.update(id, dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Permissao.ADMIN)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Remove um tipo de item (admin)' })
  @ApiParam({ name: 'id', description: 'UUID do tipo de item' })
  @ApiResponse({
    status: 200,
    description: 'Tipo de item removido com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Tipo de item não encontrado.' })
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.remove(id);
  }
}
