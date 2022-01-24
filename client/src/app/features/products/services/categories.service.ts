import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductCreateDto } from '../dto/product-create.dto';
import { ProductUpdateDto } from '../dto/product-update.dto';
import { ProductsViewDto } from '../dto/products-view.dto';
import { SearchFiltersDto } from '../dto/search-filters.dto';
import { ProductCategory } from '../models/product-category.interface';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  //category
  getCategories(): Observable<ProductCategory[]> {
    return this.http.get<ProductCategory[]>(
      `${this.apiUrl}products/sub/categories`
    );
  }

  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}products/sub/categories/${id}`
    );
  }

  createCategory(name: string): Observable<ProductCategory> {
    return this.http.post<ProductCategory>(
      `${this.apiUrl}products/sub/categories`,
      { name }
    );
  }
}
