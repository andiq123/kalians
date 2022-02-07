/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';

import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TelegramModule } from './telegram/telegram.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CartsModule } from './carts/carts.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isProduction = configService.get('STAGE') === 'prod';

        return {
          ssl: isProduction,
          extra: {
            ssl: isProduction ? { rejectUnauthorized: false } : null,
          },
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          synchronize: true,
          autoLoadEntities: true,
        };
      },
    }),
    ProductsModule,
    CategoriesModule,
    CartsModule,
    AuthModule,
    TelegramModule,
    CloudinaryModule,
    CartsModule,
    CategoriesModule,
  ],
  controllers: [],
})
export class AppModule {
  // configure(frontEnd: MiddlewareConsumer) {
  //   frontEnd.apply(FrontEndMiddleware).forRoutes({
  //     path: '*',
  //     method: RequestMethod.ALL,
  //   });
  // }
}
