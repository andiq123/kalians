import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsRepository } from './repositories/products.repository';
import { Category } from './entities/category.entity';
import { CategoryService } from './services/category.service';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([ProductsRepository, Category]),
    MulterModule.register({
      dest: './public/api/images',
    }),
  ],
  providers: [ProductsService, CategoryService],
  controllers: [ProductsController],
  exports: [],
})
export class ProductsModule {}
