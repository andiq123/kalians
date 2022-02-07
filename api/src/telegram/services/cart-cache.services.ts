/* eslint-disable prettier/prettier */
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CartCreateDto } from 'src/carts/dto/cart-create.dto';
import { ProductViewDto } from 'src/products/dto/product-view.dto';
import { CartService } from 'src/carts/services/cart.service';
import { CartCache } from '../models/cart-cache.interface';
import { CartCacheItem } from '../models/cart-cache-item.interface';
import { Cart } from 'src/carts/entities/cart.entity';

@Injectable()
export class CartServiceCache {
  MAX_ITEMS = 20;
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    private cartService: CartService,
  ) {}

  async getCart(cartId: string): Promise<CartCache> {
    let cart: CartCache = await this.cacheManager.get(cartId);
    if (!cart) {
      cart = {
        id: cartId,
        items: [],
        phoneNumber: '',
        clientName: '',
      };
      await this.cacheManager.set(cartId, cart);
    }
    return cart;
  }

  async addToCart(
    product: ProductViewDto,
    cartId: string,
  ): Promise<CartCacheItem> {
    const cart = await this.getCart(cartId);

    const itemCart = cart.items.find((x) => x.item.id === product.id);
    if (!itemCart) {
      //if item cart doesnt exists create one and update current cart
      const newCartItem = new CartCacheItem(product);
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
  }

  async removeFromCart(
    product: ProductViewDto,
    cartId: string,
  ): Promise<CartCacheItem> {
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

  async setPhoneAndClient(cartId: string, number: string, name: string) {
    const cart = await this.getCart(cartId);
    cart.phoneNumber = number;
    cart.clientName = name;
    await this.cacheManager.set(cartId, cart);
    return cart;
  }

  async HasClientInfo(cartId: string) {
    const cart = await this.getCart(cartId);
    return cart.phoneNumber && cart.clientName;
  }
}
