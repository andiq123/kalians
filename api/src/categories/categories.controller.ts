import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CategoryCreateDto } from './dto/category-create.dto';
import { Category } from './entities/category.entity';
import { CategoryService } from './services/category.service';

@UseGuards(AuthGuard())
@Controller('categories')
export class CategoriesController {
  constructor(private categoryService: CategoryService) {}
  //categories
  @Get()
  findAllCategories(): Promise<Category[]> {
    return this.categoryService.getAll();
  }

  @Get(':id')
  findOneCategory(@Param('id') id: string): Promise<Category> {
    return this.categoryService.getOne(id);
  }

  @Post()
  createCategory(@Body() category: CategoryCreateDto) {
    return this.categoryService.create(category);
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: string): Promise<void> {
    return this.categoryService.delete(id);
  }
}
