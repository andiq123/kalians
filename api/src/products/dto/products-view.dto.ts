import { Product } from '../entities/product.entity';

/* eslint-disable prettier/prettier */
export class ProductsViewDto {
  count: number;
  items: Product[];
}
