/* eslint-disable prettier/prettier */
import { unlink } from 'fs';
import { EntityRepository, Repository } from 'typeorm';
import { ProductCreateDto } from '../dto/product-create.dto';
import { ProductSearchDto } from '../dto/product-search.dto';
import { ProductsViewDto } from '../dto/products-view.dto';
import { Category } from '../entities/category.entity';
import { Product } from '../entities/product.entity';

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
  async getProducts({
    name,
    limit,
    offset,
    category,
    ids,
  }: ProductSearchDto): Promise<ProductsViewDto> {
    const query = this.createQueryBuilder('product');

    if (ids) {
      query.andWhere('product.id IN (:...ids)', { ids });
    } else {
      if (name) {
        query.andWhere('LOWER(product.name) like LOWER(:name)', {
          name: `%${name}%`,
        });
      }

      if (category) {
        query.where({ category });
      }

      if (limit) {
        query.limit(limit);
      }

      if (offset) {
        query.offset(offset);
      }
    }

    const data = await query.getManyAndCount();
    return { count: data[1], items: data[0] };
  }

  async getProduct(id: string): Promise<Product> {
    return this.findOne(id);
  }

  async createProduct(
    product: ProductCreateDto,
    category: Category,
  ): Promise<Product> {
    const newProduct = this.create({ ...product, category });
    await this.save(newProduct);
    return newProduct;
  }

  async updatePhoto(id: string, image: string): Promise<Product> {
    const product = await this.getProduct(id);
    if (product.image && product.image !== '') {
      unlink(`./public/api/${product.image}`, () => {
        console.log("couldn't delete image");
      });
    }
    image = 'images/' + image;
    const productToReturn = await this.save({ ...product, image });
    return productToReturn;
  }

  async updateProduct(id: string, product: Product): Promise<Product> {
    return this.save({ ...product, id });
  }

  async setInStockValue(id: string, value: number): Promise<Product> {
    const product = await this.getProduct(id);
    return this.save({ ...product, inStockQuantity: value });
  }
}
