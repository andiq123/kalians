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
import * as Jimp from 'jimp';
import { join } from 'path';

@Controller('products')
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

  @UseGuards(AuthGuard())
  @Post()
  async createProduct(@Body() product: ProductCreateDto): Promise<Product> {
    const category = await this.categoryService.getOne(product.categoryId);
    return this.productsService.create(product, category);
  }

  @UseGuards(AuthGuard())
  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() product: ProductUpdateDto,
  ): Promise<void> {
    const category = await this.categoryService.getOne(product.categoryId);
    return this.productsService.update(id, product, category);
  }

  @UseGuards(AuthGuard())
  @Post('file/:id')
  @UseInterceptors(FileInterceptor('file'))
  async updateProductImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const basePath = join(__dirname, '../../public/api/images', file.filename);
    const image = await Jimp.read(basePath);
    await image.resize(200, Jimp.AUTO).writeAsync(basePath);
    const product = await this.productsService.updatePhoto(id, file.filename);
    return product;
  }

  @UseGuards(AuthGuard())
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }

  @UseGuards(AuthGuard())
  @Get('increment/:id')
  async incrementInStock(@Param('id') id: string) {
    return this.productsService.incrementInStock(id);
  }

  @UseGuards(AuthGuard())
  @Get('decrement/:id')
  async decrementInStock(@Param('id') id: string) {
    return this.productsService.decrementInStock(id);
  }

  @UseGuards(AuthGuard())
  @Get('set/:id')
  async setInStockValue(
    @Param('id') id: string,
    @Param('value') value: number,
  ) {
    return this.productsService.setInStockValue(id, value);
  }

  @UseGuards(AuthGuard())
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

  @UseGuards(AuthGuard())
  @Post('sub/categories')
  createCategory(@Body() category: CategoryCreateDto) {
    return this.categoryService.create(category);
  }

  @UseGuards(AuthGuard())
  @Delete('sub/categories/:id')
  deleteCategory(@Param('id') id: string): Promise<void> {
    return this.categoryService.delete(id);
  }
}
