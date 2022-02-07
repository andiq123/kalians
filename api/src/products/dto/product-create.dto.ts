/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class ProductCreateDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  inStockQuantity: number;

  @IsString()
  @IsNotEmpty()
  categoryId: string;
}
