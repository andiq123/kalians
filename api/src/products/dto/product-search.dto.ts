/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductSearchDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  category?: string;

  @IsNumber()
  @IsOptional()
  limit?: number = 10;

  @IsNumber()
  @IsOptional()
  offset?: number = 0;
}
