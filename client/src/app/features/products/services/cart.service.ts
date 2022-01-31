import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartSearchDto } from '../dto/cart-search.dto';
import { Cart } from '../models/cart.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getCarts(
    cartSearch: CartSearchDto
  ): Observable<{ count: number; items: Cart[] }> {
    let params = new HttpParams();
    Object.entries(cartSearch).forEach(([key, value]) => {
      if (value) {
        params = params.append(key, value.toString());
      }
    });

    return this.http.get<{ count: number; items: Cart[] }>(
      `${this.apiUrl}carts`,
      { params }
    );
  }

  updateStatus(cartId: string): Observable<Cart> {
    return this.http.put<Cart>(`${this.apiUrl}carts/${cartId}`, {});
  }
}
