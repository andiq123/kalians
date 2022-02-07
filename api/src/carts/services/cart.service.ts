/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartCreateDto } from '../dto/cart-create.dto';
import { CartSearchDto } from '../dto/cart-search.dto';
import { Cart} from '../entities/cart.entity';
import { ProductsService } from '../../products/services/products.service';
import { CartItem } from '../entities/cartItem.entity';

@Injectable()
export class CartService {
  constructor(
    private productsService: ProductsService,
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
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
      clientName: cart.clientName,
      phoneNumber: cart.phoneNumber,
      status: 'pending',
      cartItems: items,
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

  async getAll(
    cartSearch?: CartSearchDto,
  ): Promise<{ count: number; items: Cart[] }> {
    const query = this.cartRepository.createQueryBuilder('cart');
    if (cartSearch?.status) {
      query.andWhere('cart.status = :status', { status: cartSearch.status });
    }
    if (cartSearch?.id) {
      query.andWhere('cart.id = :id', { id: cartSearch.id });
    }
    if (cartSearch?.clientName) {
      query.andWhere('LOWER(cart.clientName) like LOWER(:nume)', {
        nume: `%${cartSearch.clientName}%`,
      });
    }
    if (cartSearch?.phoneNumber) {
      query.andWhere('LOWER(cart.phoneNumber) like LOWER(:phoneNumber)', {
        phoneNumber: `%${cartSearch.phoneNumber}%`,
      });
    }
    if (cartSearch.date) {
      query.andWhere('cart.createdAt = :createdAt', {
        createdAt: cartSearch.date,
      });
    }

    if (cartSearch.limit) {
      query.limit(cartSearch.limit);
    }
    if (cartSearch.offset) {
      query.offset(cartSearch.offset);
    }

    query.leftJoinAndSelect('cart.cartItems', 'cartItems');
    query.leftJoinAndSelect('cartItems.product', 'product');

    query.orderBy('cart.id', 'DESC');

    const [items, count] = await query.getManyAndCount();

    return { items, count };
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
