/* eslint-disable prettier/prettier */

import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CartCreateDto } from 'src/products/dto/cart-create.dto';
import { ProductViewDto } from 'src/products/dto/product-view.dto';
import { Cart } from 'src/products/entities/cart.entity';
import { CartService } from 'src/products/services/cart.service';
import { CartCache, CartItem } from '../models/cart-cache.interface';

@Injectable()
export class CartServiceCache {
  MAX_ITEMS = 20;
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private cartService: CartService,
  ) {}

  async getCart(cartId: string): Promise<CartCache> {
    return await this.cacheManager.get(cartId);
  }

  async addToCart(product: ProductViewDto, cartId: string): Promise<CartItem> {
    const cart = await this.getCart(cartId);

    if (cart) {
      const itemCart = cart.items.find((x) => x.item.id === product.id);
      if (!itemCart) {
        //if item cart doesnt exists create one and update current cart
        const newCartItem = new CartItem(product);
        cart.items.push(newCartItem);
        await this.cacheManager.set(cartId, cart);
        return newCartItem;
      }

      //if item cart exists increment current quantity
      const newQuantity =
        itemCart.quantity > this.MAX_ITEMS
          ? this.MAX_ITEMS
          : itemCart.quantity + 1;

      const isMoreThanQuantity = product.inStockQuantity - newQuantity <= 0;
      console.log(newQuantity, product.inStockQuantity);
      console.log(isMoreThanQuantity);
      if (isMoreThanQuantity) return null;

      itemCart.quantity = newQuantity;
      await this.cacheManager.set(cartId, cart);
      return itemCart;
    } else {
      //creating new cart and adding cartItem
      const newCart = new CartCache();
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

  async submitCart(cartId: string): Promise<Cart> {
    const cart = await this.getCart(cartId);
    if (!cart) return;

    const createCart: CartCreateDto = {
      cartItems: cart.items.map((x) => ({
        productId: x.item.id,
        quantity: x.quantity,
      })),
      phoneNumber: '0726807303',
      nume: 'George',
    };

    const createdCart = await this.cartService.create(createCart);

    await this.cacheManager.del(cartId);
    return createdCart;
  }
}
// CartCache {
//   items: [ CartItem { item: [Object], quantity: 2 } ],
//   id: 574037714
// }
