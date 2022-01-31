/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-inferrable-types */

import { IsNumber, IsOptional, IsString } from 'class-validator';

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
  status: string;

  @IsNumber()
  @IsOptional()
  limit: number = 10;

  @IsNumber()
  @IsOptional()
  offset: number = 0;
}
