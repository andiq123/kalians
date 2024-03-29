import { Product } from './product.interface';

export interface Cart {
  id: number;
  cartItems: CartItem[];
  totalPrice: number;
  createdAt: Date;
  status: string;
  clientName: string;
  phoneNumber: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}
