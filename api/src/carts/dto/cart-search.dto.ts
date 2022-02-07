/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-inferrable-types */

import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { CartStatusEnum } from '../enum/cart-status.enum';

export class CartSearchDto {
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  id?: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  clientName?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  date: Date;

  @IsString()
  @IsOptional()
  @IsEnum(CartStatusEnum)
  @ApiProperty()
  status?: CartStatusEnum;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  limit: number = 10;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  offset: number = 0;
}
