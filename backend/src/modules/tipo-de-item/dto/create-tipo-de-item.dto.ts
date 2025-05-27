import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTipoDeItemDto {
  @ApiProperty({
    example: 'Fotografia',
    description: 'Nome do tipo de item do acervo',
  })
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome: string;
}
