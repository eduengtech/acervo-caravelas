import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CategoriaService } from '../services/categoria.service';
import { CreateCategoriaDto } from '../dto/create-category.dto';
import { UpdateCategoriaDto } from '../dto/update-category.dto';
import { Categoria } from 'generated/prisma';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
 
@ApiTags('categorias')
@Controller('categorias')
export class CategoriaController {
    constructor(private readonly service: CategoriaService){}

    @Post()
    @ApiOperation({ summary: 'Cria uma nova categoria'})
    @ApiResponse({ status: 201, description: 'Categoria criada com sucesso.' })
    create(@Body() dto: CreateCategoriaDto): Promise <Categoria> {
        return this.service.create(dto);
    }

    @Get()
    findAll(){
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id', new ParseUUIDPipe()) id: string) {
      return this.service.findOne(id);
    }
    
    @Patch(':id')
    update(@Param('id', new ParseUUIDPipe()) id: string, @Body() dto: UpdateCategoriaDto) {
      return this.service.update(id, dto);
    }
    
    @Delete(':id')
    remove(@Param('id', new ParseUUIDPipe()) id: string) {
      return this.service.remove(id);
    }
}
   