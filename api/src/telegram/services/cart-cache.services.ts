/* eslint-disable prettier/prettier */

import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { config } from 'process';
import { CartCreateDto } from 'src/carts/dto/cart-create.dto';
import { ProductViewDto } from 'src/products/dto/product-view.dto';
import { Cart } from 'src/carts/entities/cart.entity';
import { CartService } from 'src/carts/services/cart.service';
import {
  CartCache,
  CartItem,
  SearchData,
} from '../models/cart-cache.interface';

@Injectable()
export class CartServiceCache {
  adminDetails = {
    id: this.configService.get('ADMIN_ID'),
    username: this.configService.get('ADMIN_USERNAME'),
    phoneNumber: this.configService.get('ADMIN_PHONE'),
  };

  MAX_ITEMS = 20;
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private cartService: CartService,
    private configService: ConfigService,
  ) {}

  get getAdminDetails() {
    return this.adminDetails;
  }

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
      phoneNumber: cart.phoneNumber,
      clientName: cart.clientName,
    };

    const createdCart = await this.cartService.create(createCart);
    await this.cacheManager.del(cartId);
    return createdCart;
  }

  async setPhoneNumber(cartId: string, number: string) {
    const cart = await this.getCart(cartId);
    if (!cart) return;

    cart.phoneNumber = number;
    await this.cacheManager.set(cartId, cart);
    return cart.phoneNumber;
  }

  async setClientName(cartId: string, name: string) {
    const cart = await this.getCart(cartId);
    if (!cart) return;

    cart.clientName = name;
    await this.cacheManager.set(cartId, cart);
    return cart.clientName;
  }

  async setSearch(cartId: string, searchData: SearchData) {
    let cart = await this.getCart(cartId);
    if (!cart) {
      cart = new CartCache();
    }
    cart.searchData = searchData;
    await this.cacheManager.set(cartId, cart);
    return cart.searchData;
  }

  async getSearch(cartId: string) {
    const cart = await this.getCart(cartId);
    if (!cart) return;
    return cart.searchData;
  }
}
