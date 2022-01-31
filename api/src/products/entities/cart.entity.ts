/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToMany((_type) => CartItemLocal, (cartItemLocal) => cartItemLocal.cart, {
    eager: true,
  })
  cartItems: CartItemLocal[];

  @Column()
  totalPrice: number;

  @Column()
  clientName: string;

  @Column()
  phoneNumber: string;

  @Column()
  createdAt: Date;

  @Column()
  status: string;
}

@Entity()
export class CartItemLocal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne((type) => Product, {
    eager: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn()
  product: Product;

  @Column()
  quantity: number;

  @ManyToOne((type) => Cart, (cart) => cart.cartItems)
  cart: Cart;
}
