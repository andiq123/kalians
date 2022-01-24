/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { FileInterceptor } from '@nestjs/platform-express';
import { CategoryCreateDto } from './dto/category-create.dto';
import { ProductCreateDto } from './dto/product-create.dto';
import { ProductUpdateDto } from './dto/product-update.dto';
import { ProductViewDto } from './dto/product-view.dto';
import { ProductsViewDto } from './dto/products-view.dto';
import { Category } from './entities/category.entity';
import { Product } from './entities/product.entity';
import { CategoryService } from './services/category.service';
import { ProductsService } from './services/products.service';

@UseGuards(AuthGuard())
@Controller('api/products')
export class ProductsController {
  constructor(
    private productsService: ProductsService,
    private categoryService: CategoryService,
  ) {}

  @Get()
  findAll(@Query() filters: any): Promise<ProductsViewDto> {
    return this.productsService.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ProductViewDto> {
    return this.productsService.findOne(id);
  }

  @Post()
  async createProduct(@Body() product: ProductCreateDto): Promise<Product> {
    const category = await this.categoryService.getOne(product.categoryId);
    return this.productsService.create(product, category);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() product: ProductUpdateDto,
  ): Promise<void> {
    const category = await this.categoryService.getOne(product.categoryId);
    return this.productsService.update(id, product, category);
  }

  @Post('file/:id')
  @UseInterceptors(FileInterceptor('file'))
  async updateProductImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const product = await this.productsService.updatePhoto(id, file.filename);
    return product;
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }

  @Get('increment/:id')
  async incrementInStock(@Param('id') id: string) {
    return this.productsService.incrementInStock(id);
  }

  @Get('decrement/:id')
  async decrementInStock(@Param('id') id: string) {
    return this.productsService.decrementInStock(id);
  }

  @Get('set/:id')
  async setInStockValue(
    @Param('id') id: string,
    @Param('value') value: number,
  ) {
    return this.productsService.setInStockValue(id, value);
  }

  @Get('add/:id')
  async addInStockValue(
    @Param('id') id: string,
    @Param('value') value: number,
  ) {
    return this.productsService.addInStockValue(id, value);
  }

  //categories
  @Get('sub/categories')
  findAllCategories(): Promise<Category[]> {
    return this.categoryService.getAll();
  }

  @Get('sub/categories/:id')
  findOneCategory(@Param('id') id: string): Promise<Category> {
    return this.categoryService.getOne(id);
  }

  @Post('sub/categories')
  createCategory(@Body() category: CategoryCreateDto) {
    return this.categoryService.create(category);
  }
  @Delete('sub/categories/:id')
  deleteCategory(@Param('id') id: string): Promise<void> {
    return this.categoryService.delete(id);
  }
}
