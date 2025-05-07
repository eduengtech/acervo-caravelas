import { IsNotEmpty, IsString } from "class-validator";


export class CreateTipoDeItemDto{
    @IsString()
    @IsNotEmpty()
    nome: string;
}