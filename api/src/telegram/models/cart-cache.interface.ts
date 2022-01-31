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

export class SearchData {
  pageSize: number;
  pageNumber: number;
  categoryId: string;
  messageId?: string;
}

export class CartCache {
  id: string;
  items: CartItem[] = [];
  phoneNumber: string;
  clientName: string;
  searchData: SearchData;
}
