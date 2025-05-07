import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsUUID()
  @IsOptional()
  autorId?: string;

  @IsUUID()
  @IsNotEmpty()
  categoriaId: string;

  @IsUUID()
  @IsNotEmpty()
  tipoItemId: string;

  @IsDateString()
  @IsOptional()
  dataCriacao?: string;
}
