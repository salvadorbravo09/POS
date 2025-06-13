import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const category = await this.categoryRepository.findOneBy({
      id: createProductDto.categoryId,
    });

    if (!category) {
      throw new NotFoundException(`La categoria no existe`);
    }

    return this.productRepository.save({
      ...createProductDto,
      category,
    });
  }

  /**
   * Obtiene todos los productos con opción de filtrar por categoría
   * @param categoryId - ID opcional de la categoría para filtrar los productos
   * @returns Un objeto que contiene:
   *          - products: Array de productos con sus categorías relacionadas
   *          - total: Número total de productos encontrados
   *
   * Los productos se ordenan por ID de forma descendente (más recientes primero)
   * y se incluyen sus categorías relacionadas en la respuesta
   */
  async findAll(categoryId?: number, take?: number) {
    const options: FindManyOptions<Product> = {
      relations: {
        category: true,
      },
      order: {
        id: 'DESC',
      },
      take,
    };

    // Si hay una categoria, filtramos por categoria
    if (categoryId) {
      options.where = {
        category: {
          id: categoryId,
        },
      };
    }

    const [products, total] =
      await this.productRepository.findAndCount(options);

    return {
      products,
      total,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
