import { ConfigModule, ConfigService } from '@nestjs/config';
import { CLOUDINARY } from './cloudinary';
import { v2 } from 'cloudinary';

export const CloudinaryProvider = {
  imports: [ConfigModule],
  inject: [ConfigService],
  provide: CLOUDINARY,
  useFactory: async (configService: ConfigService) =>
    v2.config({
      cloud_name: configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: configService.get('CLOUDINARY_API_KEY'),
      api_secret: configService.get('CLOUDINARY_API_SECRET'),
    }),
};
