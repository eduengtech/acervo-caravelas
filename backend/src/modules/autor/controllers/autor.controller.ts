import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
  } from '@nestjs/common';
  import { AutorService } from '../services/autor.service';
  import { CreateAutorDto } from '../dto/create-autor.dto';
  import { UpdateAutorDto } from '../dto/update-autor.dto';
  import {
    ApiOperation,
    ApiParam,
    ApiTags,
    ApiResponse,
  } from '@nestjs/swagger';
    import { Autor } from 'generated/prisma';
  
  
  @ApiTags('Autores')
  @Controller('autores')
  export class AutorController {
    constructor(private readonly autorService: AutorService) {}
  
    @Post()
    @ApiOperation({ summary: 'Cria um novo autor' })
    @ApiResponse({ status: 201, description: 'Autor criado com sucesso.' })
    create(@Body() dto: CreateAutorDto){
      return this.autorService.create(dto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Lista todos os autores' })
    @ApiResponse({ status: 200, description: 'Lista de autores retornada com sucesso.' })
    findAll(){
      return this.autorService.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Busca um autor por ID' })
    @ApiParam({ name: 'id', description: 'UUID do autor' })
    @ApiResponse({ status: 200, description: 'Autor encontrado.' })
    @ApiResponse({ status: 404, description: 'Autor não encontrado.' })
    findOne(@Param('id', new ParseUUIDPipe()) id: string){
      return this.autorService.findOne(id);
    }
  
    @Patch(':id')
    @ApiOperation({ summary: 'Atualiza dados de um autor' })
    @ApiParam({ name: 'id', description: 'UUID do autor' })
    @ApiResponse({ status: 200, description: 'Autor atualizado com sucesso.' })
    update(
      @Param('id', new ParseUUIDPipe()) id: string,
      @Body() dto: UpdateAutorDto,
    ){
      return this.autorService.update(id, dto);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Remove um autor' })
    @ApiParam({ name: 'id', description: 'UUID do autor' })
    @ApiResponse({ status: 200, description: 'Autor removido com sucesso.' })
    remove(@Param('id', new ParseUUIDPipe()) id: string){
      return this.autorService.remove(id);
    }
  }
  