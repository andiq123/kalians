/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CartItem } from './cartItem.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToMany((_type) => CartItem, (cartItem) => cartItem.cart, {
    eager: true,
  })
  cartItems: CartItem[];

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
