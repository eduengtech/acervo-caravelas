import { PartialType } from '@nestjs/swagger';
import { CreateCategoriaDto } from './create-category.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCategoriaDto extends PartialType(CreateCategoriaDto) {
  @ApiPropertyOptional({
    description: 'Nome da categoria',
    example: 'Literatura',
  })
  nome?: string;

  @ApiPropertyOptional({
    description: 'Descrição da categoria',
    example: 'Categoria voltada a obras literárias',
  })
  descricao?: string;
}
