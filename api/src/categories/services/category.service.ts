/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryCreateDto } from '../dto/category-create.dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async getAll(): Promise<Category[]> {
    const categories = await this.categoryRepository.find();
    if (categories.length === 0) {
      throw new NotFoundException('No categories found');
    }
    return categories;
  }

  async getOne(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOne(id);
    if (!category) {
      throw new NotFoundException('No category found');
    }
    return category;
  }

  async create(categoryCreate: CategoryCreateDto) {
    const category = this.categoryRepository.create(categoryCreate);
    await this.categoryRepository.save(category);
    return category;
  }

  async delete(id: string) {
    await this.getOne(id);
    try {
      await this.categoryRepository.delete(id);
    } catch (error) {
      throw new BadRequestException('This category is used in some product');
    }
  }
}
