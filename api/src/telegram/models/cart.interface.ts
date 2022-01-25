/* eslint-disable prettier/prettier */
import { ProductViewDto } from 'src/products/dto/product-view.dto';

export class CartItem {
  item: ProductViewDto;
  quantity: number;
  constructor(product: ProductViewDto) {
    this.item = product;
    this.quantity = 1;
  }
}

export class Cart {
  id: string;
  items: CartItem[] = [];
}
