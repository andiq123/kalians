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
      limits: { fileSize: 1000000 },
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return cb(new Error('Please upload an image'), false);
        }
        cb(null, true);
      },
    }),
  ],
  providers: [ProductsService, CategoryService],
  controllers: [ProductsController],
  exports: [],
})
export class ProductsModule {}
