/* eslint-disable prettier/prettier */
import { ProductViewDto } from 'src/products/dto/product-view.dto';

export class CartCacheItem {
  item: ProductViewDto;
  quantity: number;
  constructor(product: ProductViewDto) {
    this.item = product;
    this.quantity = 1;
  }
}
