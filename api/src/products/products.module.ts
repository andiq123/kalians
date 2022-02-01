/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsRepository } from './repositories/products.repository';
import { Category } from './entities/category.entity';
import { CategoryService } from './services/category.service';
import { AuthModule } from 'src/auth/auth.module';
import { Cart, CartItemLocal } from './entities/cart.entity';
import { CartService } from './services/cart.service';
import { CartsController } from './carts.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  controllers: [ProductsController, CartsController],
  imports: [
    AuthModule,
    CloudinaryModule,
    TypeOrmModule.forFeature([
      ProductsRepository,
      Category,
      Cart,
      CartItemLocal,
    ]),
  ],
  providers: [ProductsService, CategoryService, CartService],
  exports: [ProductsService, CategoryService, CartService],
})
export class ProductsModule {}
