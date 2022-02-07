import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from './categories.controller';
import { Category } from './entities/category.entity';
import { CategoryService } from './services/category.service';

@Module({
  controllers: [CategoriesController],
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoriesModule {}
