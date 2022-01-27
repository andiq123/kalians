/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Cart } from './entities/cart.entity';
import { CartService } from './services/cart.service';

@UseGuards(AuthGuard())
@Controller('carts')
export class CartsController {
  constructor(private cartsService: CartService) {}

  @Get()
  getCarts(): Promise<Cart[]> {
    return this.cartsService.getAll();
  }

  @Put(':id')
  updateStatus(@Param('id') id: string): Promise<Cart> {
    return this.cartsService.updateStatus(id);
  }
}
