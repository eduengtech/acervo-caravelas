import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateItemDto {
  @ApiProperty({ example: 'Título da obra' })
  @IsString({ message: 'O título deve ser uma string' })
  @IsNotEmpty({ message: 'O título é obrigatório' })
  titulo: string;
  @ApiProperty({ example: 'Descrição da obra' })
  @IsString({ message: 'O título deve ser uma string' })
  @IsNotEmpty({ message: 'O título é obrigatório' })
  descricao: string;

  @ApiProperty({ example: 'uuid-do-autor', required: false })
  @IsUUID()
  @IsOptional()
  autorId?: string;

  @ApiProperty({ example: 'uuid-da-categoria' })
  @IsUUID()
  @IsNotEmpty({ message: 'O título é obrigatório' })
  categoriaId: string;

  @ApiProperty({ example: 'uuid-do-tipo' })
  @IsUUID()
  @IsNotEmpty({ message: 'O título é obrigatório' })
  tipoItemId: string;

  @ApiProperty({ example: '2024-05-01', required: false })
  @IsDateString()
  @IsOptional()
  dataCriacao?: string;
}
