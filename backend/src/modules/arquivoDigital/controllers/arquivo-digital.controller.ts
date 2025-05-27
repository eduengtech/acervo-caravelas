import {
  Body,
  Controller,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  BadRequestException,
  Get,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ArquivoDigitalService } from '../services/arquivo-digital.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateArquivoDto } from '../dto/create-arquivoDigital.dto';
import { extname } from 'path';
import * as mime from 'mime-types';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { RolesGuard } from '../../../common/guards/roles.guards';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Permissao } from '../../../../generated/prisma';
import { Request as ExpressRequest } from 'express';

@ApiTags('Arquivos Digitais')
@Controller('arquivos')
export class ArquivoDigitalController {
  constructor(private readonly service: ArquivoDigitalService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('upload')
  @ApiOperation({ summary: 'Faz upload de um arquivo digital (autenticado)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Arquivo a ser enviado e dados adicionais',
    type: CreateArquivoDto,
  })
  @ApiResponse({ status: 201, description: 'Arquivo criado com sucesso.' })
  @ApiResponse({
    status: 400,
    description: 'Arquivo inválido ou dados incorretos.',
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          const fileExtName = extname(file.originalname);
          cb(null, `${uniqueSuffix}${fileExtName}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedMimes = [
          'image/png',
          'image/jpeg',
          'application/pdf',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ];
        if (allowedMimes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new BadRequestException('Tipo de arquivo não permitido'), false);
        }
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // Corrigido para 5MB em bytes
      },
    }),
  )
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateArquivoDto,
    @Request() req: ExpressRequest,
  ): Promise<{ id: string; itemId: string; url: string; tipo: string }> {
    if (!file) {
      throw new BadRequestException('Arquivo é obrigatório');
    }

    const url = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
    const tipoLookup = mime.lookup(file.originalname);
    const tipo =
      typeof tipoLookup === 'string' ? tipoLookup : 'application/octet-stream';

    const data = { ...body, url, tipo };

    return this.service.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os arquivos digitais (restrito)' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Permissao.ADMIN, Permissao.EDITOR)
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um arquivo por ID (restrito)' })
  @ApiParam({ name: 'id', description: 'UUID do arquivo' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Permissao.ADMIN, Permissao.EDITOR)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findOne(id);
  }

  @Get('item/:itemId')
  @ApiOperation({ summary: 'Lista arquivos digitais de um item público' })
  @ApiParam({ name: 'itemId', description: 'UUID do item do acervo' })
  async findByItem(@Param('itemId', ParseUUIDPipe) itemId: string) {
    return this.service.findByItemId(itemId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um arquivo digital (somente ADMIN)' })
  @ApiParam({ name: 'id', description: 'UUID do arquivo' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Permissao.ADMIN)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.remove(id);
  }
}
