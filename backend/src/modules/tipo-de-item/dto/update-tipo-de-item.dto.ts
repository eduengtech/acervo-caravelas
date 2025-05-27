import { PartialType } from '@nestjs/swagger';
import { CreateTipoDeItemDto } from './create-tipo-de-item.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTipoDeItemDto extends PartialType(CreateTipoDeItemDto) {
  @ApiPropertyOptional({
    example: 'Livro',
    description: 'Nome do tipo de item',
  })
  nome?: string;
}
