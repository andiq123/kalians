/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-inferrable-types */

import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { CartStatusEnum } from '../enum/cart-status.enum';

export class CartSearchDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  clientName?: string;

  @IsString()
  @IsOptional()
  date: Date;

  @IsString()
  @IsOptional()
  @IsEnum(CartStatusEnum)
  status?: CartStatusEnum;

  @IsNumber()
  @IsOptional()
  limit: number = 10;

  @IsNumber()
  @IsOptional()
  offset: number = 0;
}
