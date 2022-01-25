import { CacheModule, Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { ProductsModule } from 'src/products/products.module';

import { AppUpdate } from './app.update';
import { addIsTyping } from './middleware/add-isTyping.middleware';

import { CartService } from './services/cart.services';

@Module({
  imports: [
    ProductsModule,
    TelegrafModule.forRoot({
      token: '5064551951:AAFv2-QBu0PnZCEcLexGXkHRlNz1XYhZWCU',
      botName: 'romania_kalian_bot',
      middlewares: [addIsTyping],
    }),
    CacheModule.register({
      ttl: 600,
      max: 100,
    }),
  ],
  providers: [AppUpdate, CartService],
})
export class TelegramModule {}
