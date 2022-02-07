/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsRepository } from './repositories/products.repository';
import { AuthModule } from 'src/auth/auth.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  controllers: [ProductsController],
  imports: [
    AuthModule,
    CloudinaryModule,
    CategoriesModule,
    TypeOrmModule.forFeature([ProductsRepository]),
  ],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
