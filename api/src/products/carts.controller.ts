/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CartSearchDto } from './dto/cart-search.dto';
import { Cart } from './entities/cart.entity';
import { CartService } from './services/cart.service';

@UseGuards(AuthGuard())
@Controller('carts')
export class CartsController {
  constructor(private cartsService: CartService) {}

  @Get()
  getCarts(
    @Query() cartSearch: CartSearchDto,
  ): Promise<{ count: number; items: Cart[] }> {
    return this.cartsService.getAll(cartSearch);
  }

  @Put(':id')
  updateStatus(@Param('id') id: string): Promise<Cart> {
    return this.cartsService.updateStatus(id);
  }
}
