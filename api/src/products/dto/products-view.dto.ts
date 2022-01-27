/* eslint-disable prettier/prettier */
import { Product } from '../entities/product.entity';

export class ProductsViewDto {
  count: number;
  items: Product[];
}
