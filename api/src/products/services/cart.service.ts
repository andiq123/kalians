/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartCreateDto } from '../dto/cart-create.dto';
import { Cart, CartItemLocal } from '../entities/cart.entity';
import { ProductsService } from './products.service';

@Injectable()
export class CartService {
  constructor(
    private productsService: ProductsService,
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItemLocal)
    private readonly cartItemRepository: Repository<CartItemLocal>,
  ) {}

  async create(cart: CartCreateDto) {
    const products = await this.productsService.findAll({
      ids: cart.cartItems.map((x) => x.productId),
    });
    const totalPrice = products.items.reduce(
      (acc, cur) =>
        acc +
        cur.price * cart.cartItems.find((x) => x.productId === cur.id).quantity,
      0,
    );

    const items = cart.cartItems.map((x) => ({
      product: products.items.find((y) => y.id === x.productId),
      quantity: x.quantity,
    }));

    const newCart = {
      createdAt: new Date(),
      totalPrice: totalPrice,
      nume: cart.nume,
      phoneNumber: cart.phoneNumber,
      status: 'pending',
    };

    const cartToCreate = this.cartRepository.create(newCart);
    const createdCart = await this.cartRepository.save(cartToCreate);

    items.forEach(async (x) => {
      const itemCart = this.cartItemRepository.create({
        product: x.product,
        quantity: x.quantity,
        cart: createdCart,
      });
      await this.cartItemRepository.save(itemCart);
    });
    return createdCart;
  }

  async getAll(): Promise<Cart[]> {
    const carts = await this.cartRepository.find();
    if (carts.length === 0) {
      throw new NotFoundException('No carts found');
    }
    return carts;
  }

  async getOne(id: string): Promise<Cart> {
    const cart = await this.cartRepository.findOne(id);
    if (!cart) {
      throw new NotFoundException('No cart found');
    }
    return cart;
  }

  async updateStatus(cartId: string) {
    const cart = await this.getOne(cartId);
    cart.cartItems.forEach(async (x) => {
      const productFromDb = await this.productsService.findOne(x.product.id);
      const newQuantity = (productFromDb.inStockQuantity -= x.quantity);
      await this.productsService.setInStockValue(x.product.id, newQuantity);
    });
    cart.status = 'completed';
    await this.cartRepository.save(cart);
    return cart;
  }
}
