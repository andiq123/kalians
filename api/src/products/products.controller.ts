/* eslint-disable prettier/prettier */
import {
  BadRequestException,
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
import { CategoryService } from 'src/categories/services/category.service';
import { ProductCreateDto } from './dto/product-create.dto';
import { ProductUpdateDto } from './dto/product-update.dto';
import { ProductViewDto } from './dto/product-view.dto';
import { ProductsViewDto } from './dto/products-view.dto';
import { Product } from './entities/product.entity';
import { ProductsService } from './services/products.service';

@UseGuards(AuthGuard())
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

  @Post()
  async createProduct(@Body() product: ProductCreateDto): Promise<Product> {
    const category = await this.categoryService.getOne(product.categoryId);
    return this.productsService.create(product, category);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() product: ProductUpdateDto,
  ): Promise<ProductViewDto> {
    const category = await this.categoryService.getOne(product.categoryId);
    return this.productsService.update(id, product, category);
  }

  @Post('file/:id')
  @UseInterceptors(FileInterceptor('file'))
  async updateProductImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const product = await this.productsService.updatePhoto(id, file);
      return product;
    } catch (error) {
      throw new BadRequestException(
        'Nu sa putut uploada imaginea, sterge produsul si incearca cu alta poza, sau contacteaza administratorul, details:' +
          error.message,
      );
    }
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
}
