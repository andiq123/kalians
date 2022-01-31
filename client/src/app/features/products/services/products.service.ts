import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { finalize, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductCreateDto } from '../dto/product-create.dto';
import { ProductUpdateDto } from '../dto/product-update.dto';
import { ProductsViewDto } from '../dto/products-view.dto';
import { SearchFiltersDto } from '../dto/search-filters.dto';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient, private toastr: ToastrService) {}

  getProducts(filters: SearchFiltersDto): Observable<ProductsViewDto> {
    let params = new HttpParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params = params.append(key, value);
      }
    });

    return this.http.get<ProductsViewDto>(`${this.apiUrl}products`, { params });
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}products/${id}`);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.apiUrl}products/${id}`);
  }

  createProduct(productDto: ProductCreateDto, image: File) {
    this.toastr.info('Creating product...');
    return this.http.post<Product>(`${this.apiUrl}products`, productDto).pipe(
      switchMap((product) => {
        this.toastr.info('Product created');
        if (!image) return of(product);
        const formData = new FormData();
        formData.append('file', image!);
        this.toastr.info('Uploading image...');
        return this.http.post(
          `${this.apiUrl}products/file/${product.id}`,
          formData
        );
      }),
      finalize(() => this.toastr.info('Image Uploaded'))
    );
  }

  updateProduct(productDto: ProductUpdateDto, image: File) {
    return this.http
      .patch<Product>(`${this.apiUrl}products/${productDto.id}`, productDto)
      .pipe(
        switchMap((product) => {
          if (!image) return of(product);
          const formData = new FormData();
          formData.append('file', image!);
          return this.http.post(
            `${this.apiUrl}products/file/${productDto.id}`,
            formData
          );
        })
      );
  }

  incrementInStockValue(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}products/increment/${id}`);
  }

  decrementInStockValue(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}products/decrement/${id}`);
  }
}
