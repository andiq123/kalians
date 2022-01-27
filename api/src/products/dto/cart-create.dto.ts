/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class CartCreateDto {
  @IsString()
  @IsNotEmpty()
  cartItems: {
    productId: string;
    quantity: number;
  }[];

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  nume: string;
}
