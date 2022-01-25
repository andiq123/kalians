/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';

import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TelegramModule } from './telegram/telegram.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'kalians',
      username: 'postgres',
      password: 'pass123',
      synchronize: true,
      autoLoadEntities: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api*'],
    }),
    ProductsModule,
    AuthModule,
    TelegramModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  // configure(frontEnd: MiddlewareConsumer) {
  //   frontEnd.apply(FrontEndMiddleware).forRoutes({
  //     path: '*',
  //     method: RequestMethod.ALL,
  //   });
  // }
}
