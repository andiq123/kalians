import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CategoriesController } from './categories.controller';
import { Category } from './entities/category.entity';
import { CategoryService } from './services/category.service';

@Module({
  controllers: [CategoriesController],
  imports: [AuthModule, TypeOrmModule.forFeature([Category])],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoriesModule {}
