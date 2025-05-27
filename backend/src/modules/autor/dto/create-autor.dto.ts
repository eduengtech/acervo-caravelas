import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateAutorDto {
  @ApiProperty({
    example: 'Machado de Assis',
    description: 'Nome completo do autor',
  })
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome: string;

  @ApiProperty({
    example: '1839-06-21',
    description: 'Data de nascimento no formato ISO (YYYY-MM-DD)',
  })
  @IsDateString(
    {},
    {
      message: 'A data de nascimento deve estar no formato válido (YYYY-MM-DD)',
    },
  )
  @IsNotEmpty({ message: 'A data de nascimento é obrigatória' })
  dataNascimento: string;
}
