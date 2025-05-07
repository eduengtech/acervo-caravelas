import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TipoDeItemService } from '../services/tipo-de-item.service';
import { CreateTipoDeItemDto } from '../dto/create-tipo-de-item.dto';
import { UpdateTipoDeItemDto } from '../dto/update-tipo-de-item.dto';

@Controller('tipo-de-item')
export class TipoDeItemController {
    constructor(private readonly service: TipoDeItemService) {}

    @Post()
    create(@Body() dto: CreateTipoDeItemDto) {
        return this.service.create(dto);
    }

    @Get()
    findAll(){
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.service.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateTipoDeItemDto){
        return this.service.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}
