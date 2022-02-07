/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AdminDetails } from '../models/admin-details.interface';

@Injectable()
export class CommonService {
  private adminDetails: AdminDetails = {
    id: this.configService.get('ADMIN_ID'),
    username: this.configService.get('ADMIN_USERNAME'),
    phoneNumber: this.configService.get('ADMIN_PHONE'),
  };

  private defaultImage = this.configService.get('DEFAULT_IMAGE');

  constructor(private configService: ConfigService) {}

  get AdminDetails(): AdminDetails {
    return this.adminDetails;
  }

  get DefaultImage(): string {
    return this.defaultImage;
  }
}
