import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AutorService } from '../services/autor.service';
import { CreateAutorDto } from '../dto/create-autor.dto';
import { UpdateAutorDto } from '../dto/update-autor.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../../common/guards/roles.guards';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Permissao } from '../../../../generated/prisma';

@ApiTags('Autores')
@Controller('autores')
export class AutorController {
  constructor(private readonly autorService: AutorService) {}

  /**
   * Rotas públicas
   */

  @Get()
  @ApiOperation({ summary: 'Lista todos os autores (público)' })
  @ApiResponse({
    status: 200,
    description: 'Lista de autores retornada com sucesso.',
  })
  findAll() {
    return this.autorService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um autor por ID (público)' })
  @ApiParam({ name: 'id', description: 'UUID do autor' })
  @ApiResponse({ status: 200, description: 'Autor encontrado.' })
  @ApiResponse({ status: 404, description: 'Autor não encontrado.' })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.autorService.findOne(id);
  }

  /**
   * Rotas administrativas (protegidas por JWT + permissões)
   */

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Permissao.ADMIN, Permissao.EDITOR)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Cria um novo autor (admin/editor)' })
  @ApiResponse({ status: 201, description: 'Autor criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() dto: CreateAutorDto) {
    return this.autorService.create(dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Permissao.ADMIN, Permissao.EDITOR)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza dados de um autor (admin/editor)' })
  @ApiParam({ name: 'id', description: 'UUID do autor' })
  @ApiResponse({ status: 200, description: 'Autor atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Autor não encontrado.' })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateAutorDto,
  ) {
    return this.autorService.update(id, dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Permissao.ADMIN)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Remove um autor (admin)' })
  @ApiParam({ name: 'id', description: 'UUID do autor' })
  @ApiResponse({ status: 200, description: 'Autor removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Autor não encontrado.' })
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.autorService.remove(id);
  }
}
