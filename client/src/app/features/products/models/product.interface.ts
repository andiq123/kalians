import { ProductCategory } from './product-category.interface';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  inStockQuantity: number;
  categoryId: string;
}
