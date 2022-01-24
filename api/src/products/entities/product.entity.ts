/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  image: string;

  @Column()
  inStockQuantity: number;

  @ManyToOne((type) => Category, (category) => category.products, {
    eager: true,
  })
  category: Category;
}
