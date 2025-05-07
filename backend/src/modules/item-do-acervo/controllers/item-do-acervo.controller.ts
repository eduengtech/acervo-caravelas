import { Controller, Get, Post, Body, Param, Patch, Delete, Request, UseGuards } from '@nestjs/common';
import { ItemDoAcervoService } from '../services/item-do-acervo.service';
import { CreateItemDto } from '../dto/create-item.dto';
import { UpdateItemDto } from '../dto/update-item.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/decorators/user.decorator';

@Controller('item-do-acervo')
export class ItemDoAcervoController {
  constructor(private readonly itemService: ItemDoAcervoService) {}
  
  @UseGuards(AuthGuard('jwt')) 
  @Post()
  async create(@Body() dto: CreateItemDto, @User() user: any) {
    return this.itemService.create(dto, user.userId); 
  }
  
  @Get()
  async findAll() {
    return this.itemService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.itemService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemService.update(id, updateItemDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.itemService.remove(id);
  }
}
