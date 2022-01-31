import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { ProductsModule } from 'src/products/products.module';

import { AppUpdate } from './app.update';
import { addIsTyping } from './middleware/add-isTyping.middleware';

import { CartServiceCache } from './services/cart-cache.services';

@Module({
  imports: [
    ConfigModule,
    ProductsModule,
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        token: configService.get('TELEGRAM_BOT_TOKEN'),
        botName: configService.get('TELEGRAM_BOT_NAME'),
        middlewares: [addIsTyping],
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
  providers: [AppUpdate, CartServiceCache],
})
export class TelegramModule {}
// ttl: 600,
//       max: 100,
