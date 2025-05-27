import { PartialType } from '@nestjs/swagger';
import { CreateAutorDto } from './create-autor.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAutorDto extends PartialType(CreateAutorDto) {
  @ApiPropertyOptional({
    example: 'Machado de Assis',
    description: 'Nome do autor',
  })
  nome?: string;

  @ApiPropertyOptional({
    example: '1839-06-21',
    description: 'Data de nascimento do autor',
    type: String,
    format: 'date',
  })
  dataNascimento?: string;
}
