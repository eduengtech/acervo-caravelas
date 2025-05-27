import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateArquivoDto {
  @ApiProperty({
    example: 'uuid-do-item',
    description: 'ID do item do acervo ao qual o arquivo será vinculado',
  })
  @IsUUID()
  @IsNotEmpty({ message: 'O itemId é obrigatório e deve ser um UUID válido' })
  @Type(() => String)
  itemId: string;

  // Ignora qualquer outro campo não mapeado, como "file"
  // Isso evita o erro "property file should not exist"
  [key: string]: any;
}
