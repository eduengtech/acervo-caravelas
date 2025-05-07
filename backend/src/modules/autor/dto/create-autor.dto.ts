import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateAutorDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  @IsDateString()
  dataNascimento: string;
}
