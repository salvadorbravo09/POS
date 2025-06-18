import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';

export class TransactionContentsDto {
  @IsNotEmpty({ message: 'El ID del producto es obligatorio' })
  @IsInt({ message: 'Producto no valido' })
  productId: number;

  @IsNotEmpty({ message: 'La cantidad es obligatoria' })
  @IsInt({ message: 'Cantidad no valida' })
  quantity: number;

  @IsNotEmpty({ message: 'Precio no puede estar vacio' })
  @IsNumber({}, { message: 'Precio no valido' })
  price: number;
}

export class CreateTransactionDto {
  @IsNotEmpty({ message: 'El total no puede ir vacio' })
  @IsNumber({}, { message: 'Cantidad no valida' })
  total: number;

  @IsArray()
  @ArrayNotEmpty({ message: 'Los contenidos no pueden ir vacios' })
  @ValidateNested()
  @Type(() => TransactionContentsDto)
  contents: TransactionContentsDto[];
}
