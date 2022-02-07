/* eslint-disable prettier/prettier */
import { CartCacheItem } from './cart-cache-item.interface';

export class CartCache {
  id: string;
  items: CartCacheItem[] = [];
  phoneNumber: string;
  clientName: string;
}
