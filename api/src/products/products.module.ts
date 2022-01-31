/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsRepository } from './repositories/products.repository';
import { Category } from './entities/category.entity';
import { CategoryService } from './services/category.service';
import { MulterModule } from '@nestjs/platform-express';
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
    // MulterModule.register({
    //   dest: './public/api/images',
    //   limits: { fileSize: 1000000 },
    //   fileFilter: (req, file, cb) => {
    //     if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    //       return cb(new Error('Please upload an image'), false);
    //     }
    //     cb(null, true);
    //   },
    // }),
  ],
  providers: [ProductsService, CategoryService, CartService],
  exports: [ProductsService, CategoryService, CartService],
})
export class ProductsModule {}
