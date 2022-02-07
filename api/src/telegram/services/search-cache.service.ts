/* eslint-disable prettier/prettier */
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { SearchCache } from '../models/search-cache.interface';
import { SearchUpdateDto } from '../models/search-update.dto';

@Injectable()
export class SearchService {
  baseUrl = 'search/';
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  async set(id: string, data: SearchUpdateDto): Promise<SearchCache> {
    await this.cacheManager.set(this.baseUrl + id, data);
    return await this.get(id);
  }

  async get(id: string): Promise<SearchCache> {
    let searchData: SearchCache = await this.cacheManager.get(
      this.baseUrl + id,
    );
    if (!searchData) {
      searchData = {
        id,
        categoryId: null,
        pageNumber: 1,
        pageSize: 5,
        messageId: null,
        pageMessageId: null,
      };
      await this.cacheManager.set(this.baseUrl + id, searchData);
    }
    return searchData;
  }
}
