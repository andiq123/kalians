/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ProductCreateDto } from '../dto/product-create.dto';
import { ProductSearchDto } from '../dto/product-search.dto';
import { ProductUpdateDto } from '../dto/product-update.dto';
import { ProductViewDto } from '../dto/product-view.dto';
import { ProductsViewDto } from '../dto/products-view.dto';
import { Category } from '../../categories/entities/category.entity';
import { Product } from '../entities/product.entity';
import { ProductsRepository } from '../repositories/products.repository';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsRepository)
    private productsRepository: ProductsRepository,
    private cloudinaryService: CloudinaryService,
  ) {}

  findAll(filters: ProductSearchDto): Promise<ProductsViewDto> {
    return this.productsRepository.getProducts(filters);
  }

  async findOne(id: string): Promise<ProductViewDto> {
    const product = await this.productsRepository.getProduct(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    const productViewDto: ProductViewDto = {
      id: product.id,
      name: product.name,
      description: product.description,
      image: product.image,
      inStockQuantity: product.inStockQuantity,
      price: product.price,
      categoryId: product.category.id,
    };
    return productViewDto;
  }

  async create(
    product: ProductCreateDto,
    category: Category,
  ): Promise<Product> {
    const productToCreate = await this.productsRepository.createProduct(
      product,
      category,
    );

    return productToCreate;
  }

  async update(
    id: string,
    product: ProductUpdateDto,
    category?: Category,
  ): Promise<ProductViewDto> {
    await this.findOne(id);
    const { name, description, inStockQuantity, price } = product;
    await this.productsRepository.update(id, {
      name,
      description,
      inStockQuantity,
      price,
      category,
    });
    return await this.findOne(id);
  }

  async updatePhoto(id: string, file: Express.Multer.File): Promise<Product> {
    const product = await this.productsRepository.getProduct(id);
    if (product.image) {
      await this.cloudinaryService.deleteImage(product.image);
    }
    const result = await this.cloudinaryService.uploadImage(file);
    return this.productsRepository.updatePhoto(product, result.url);
  }

  async delete(id: string): Promise<void> {
    const product = await this.findOne(id);
    if (product.image) {
      await this.cloudinaryService.deleteImage(product.image);
    }
    await this.productsRepository.delete(id);
  }

  async incrementInStock(id: string): Promise<Product> {
    const product = await this.findOne(id);
    const inStockQuantity = product.inStockQuantity + 1;
    return await this.productsRepository.setInStockValue(id, inStockQuantity);
  }

  async decrementInStock(id: string): Promise<Product> {
    const product = await this.findOne(id);
    const inStockQuantity = product.inStockQuantity - 1;
    return await this.productsRepository.setInStockValue(id, inStockQuantity);
  }

  async setInStockValue(id: string, value: number): Promise<Product> {
    await this.findOne(id);
    return await this.productsRepository.setInStockValue(id, value);
  }
}
