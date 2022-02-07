import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { CartsModule } from 'src/carts/carts.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { ProductsModule } from 'src/products/products.module';
import { AppUpdate } from './app.update';
import { ErrorAndActions } from './middleware/error-actions.middleware';
import { CartServiceCache } from './services/cart-cache.services';
import { CommonService } from './services/common.service';
import { SearchService } from './services/search-cache.service';

@Module({
  imports: [
    ConfigModule,
    ProductsModule,
    CartsModule,
    CategoriesModule,
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        token: configService.get('TELEGRAM_BOT_TOKEN'),
        botName: configService.get('TELEGRAM_BOT_NAME'),
        middlewares: [ErrorAndActions],
      }),
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ttl: configService.get('CACHE_TIME'),
        max: configService.get('CACHE_MAX'),
      }),
    }),
  ],
  providers: [AppUpdate, CartServiceCache, CommonService, SearchService],
})
export class TelegramModule {}
