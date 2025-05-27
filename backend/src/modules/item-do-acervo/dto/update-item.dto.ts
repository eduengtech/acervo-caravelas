import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateItemDto {
  @ApiPropertyOptional({ example: 'Novo título da obra' })
  @IsOptional()
  @IsString()
  titulo?: string;

  @ApiPropertyOptional({ example: 'Nova descrição da obra' })
  @IsOptional()
  @IsString()
  descricao?: string;

  @ApiPropertyOptional({ example: 'uuid-do-novo-tipo' })
  @IsOptional()
  @IsUUID()
  tipoItemId?: string;

  @ApiPropertyOptional({ example: 'uuid-da-nova-categoria' })
  @IsOptional()
  @IsUUID()
  categoriaId?: string;

  @ApiPropertyOptional({ example: 'uuid-do-novo-autor' })
  @IsOptional()
  @IsUUID()
  autorId?: string;

  @ApiPropertyOptional({ example: '2024-05-01' })
  @IsOptional()
  @IsDateString()
  dataCriacao?: string;
}
