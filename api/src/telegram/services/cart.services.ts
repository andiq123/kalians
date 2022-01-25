/* eslint-disable prettier/prettier */
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ProductViewDto } from 'src/products/dto/product-view.dto';
import { Cart, CartItem } from '../models/cart.interface';

@Injectable()
export class CartService {
  MAX_ITEMS = 20;
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getCart(cartId: string): Promise<Cart> {
    return await this.cacheManager.get(cartId);
  }

  async addToCart(product: ProductViewDto, cartId: string): Promise<CartItem> {
    const cart = await this.getCart(cartId);
    if (cart) {
      const itemCart = cart.items.find((x) => x.item.id === product.id);
      if (!itemCart) {
        const newCartItem = new CartItem(product);
        cart.items.push(newCartItem);
        await this.cacheManager.set(cartId, cart);
        return newCartItem;
      }
      itemCart.quantity =
        itemCart.quantity >= this.MAX_ITEMS
          ? this.MAX_ITEMS
          : itemCart.quantity + 1;
      await this.cacheManager.set(cartId, cart);
      return itemCart;
    } else {
      const newCart = new Cart();
      const newCartItem = new CartItem(product);
      newCart.id = cartId;
      newCart.items = [newCartItem];
      await this.cacheManager.set(cartId, newCart);
      return newCartItem;
    }
  }

  async removeFromCart(
    product: ProductViewDto,
    cartId: string,
  ): Promise<CartItem> {
    const cart = await this.getCart(cartId);
    if (cart) {
      const itemCart = cart.items.find((x) => x.item.id === product.id);
      if (itemCart) {
        itemCart.quantity = itemCart.quantity - 1;
        if (itemCart.quantity === 0) {
          cart.items = cart.items.filter((x) => x.item.id !== product.id);
        }
        await this.cacheManager.set(cartId, cart);
        return itemCart;
      }
    }
  }
}
