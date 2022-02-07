import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from 'src/products/products.module';
import { CartsController } from './carts.controller';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cartItem.entity';
import { CartService } from './services/cart.service';

@Module({
  controllers: [CartsController],
  imports: [ProductsModule, TypeOrmModule.forFeature([Cart, CartItem])],
  providers: [CartService],
  exports: [CartService],
})
export class CartsModule {}
