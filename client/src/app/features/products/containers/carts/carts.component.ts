import { Component, OnInit } from '@angular/core';
import { Cart } from '../../models/cart.interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.scss'],
})
export class CartsComponent implements OnInit {
  carts: Cart[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.populateCart();
  }
  populateCart() {
    this.cartService.getCarts().subscribe((carts) => {
      this.carts = carts;
    });
  }

  onUpdateStatus(cartId: string) {
    this.cartService.updateStatus(cartId).subscribe((cart) => {
      this.carts = this.carts.map((x) => {
        if (x.id === cart.id) {
          return cart;
        }
        return x;
      });
    });
  }
}
