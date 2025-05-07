import { IsDateString, IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateItemDto {
  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsUUID()
  tipoItemId?: string;

  @IsOptional()
  @IsUUID()
  categoriaId?: string;

  @IsOptional()
  @IsUUID()
  autorId?: string;

  @IsOptional() 
  @IsDateString()
  dataCriacao?: string;
}
