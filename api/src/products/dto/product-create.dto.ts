/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Category } from '../entities/category.entity';

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
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  inStockQuantity: number;

  @IsString()
  @IsNotEmpty()
  categoryId: string;
}
