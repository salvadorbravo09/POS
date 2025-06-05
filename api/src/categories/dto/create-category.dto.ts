import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({
    message: 'El nombre de la Categoria no puede estar vacío',
  })
  name: string;
}
