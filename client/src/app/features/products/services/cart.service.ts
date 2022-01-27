import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart } from '../models/cart.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getCarts(): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.apiUrl}carts`);
  }

  updateStatus(cartId: string): Observable<Cart> {
    return this.http.put<Cart>(`${this.apiUrl}carts/${cartId}`, {});
  }
}
