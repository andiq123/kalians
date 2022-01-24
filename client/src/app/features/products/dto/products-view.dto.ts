import { Product } from '../models/product.interface';

export interface ProductsViewDto {
  count: number;
  items: Product[];
}
