/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { ProductCreateDto } from './product-create.dto';

export class ProductUpdateDto extends PartialType(ProductCreateDto) {
  @IsString()
  @IsNotEmpty()
  id: string;
}
