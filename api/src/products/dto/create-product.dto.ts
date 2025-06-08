import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'El nombre del producto es obligatorio' })
  @IsString({ message: 'El nombre del producto debe ser texto' })
  name: string;

  @IsNotEmpty({ message: 'El precio del producto es obligatorio' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El precio debe ser un número con máximo 2 decimales' },
  )
  price: number;

  @IsNotEmpty({ message: 'La cantidad del producto es obligatoria' })
  @IsNumber(
    { maxDecimalPlaces: 0 },
    { message: 'La cantidad debe ser un número entero' },
  )
  inventory: number;

  @IsNotEmpty({ message: 'La categoría del producto es obligatoria' })
  @IsInt({ message: 'La categoría debe ser un número entero válido' })
  categoryId: number;
}
