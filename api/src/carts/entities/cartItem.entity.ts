/* eslint-disable prettier/prettier */
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cart } from './cart.entity';

@Entity()
export class CartItem {
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
