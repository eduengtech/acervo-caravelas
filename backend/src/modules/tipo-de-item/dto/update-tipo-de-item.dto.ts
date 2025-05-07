import { PartialType } from "@nestjs/mapped-types";
import { CreateTipoDeItemDto } from "./create-tipo-de-item.dto";


export class UpdateTipoDeItemDto extends PartialType(CreateTipoDeItemDto){}