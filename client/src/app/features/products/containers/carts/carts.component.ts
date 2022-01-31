import { Component, OnInit } from '@angular/core';
import { CartSearchDto } from '../../dto/cart-search.dto';
import { Cart } from '../../models/cart.interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.scss'],
})
export class CartsComponent implements OnInit {
  carts: Cart[] = [];
  filters: CartSearchDto = {
    limit: 5,
    offset: 0,
  };
  totalItems = 0;
  currentPage = 1;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.populateCarts();
  }

  onPageChange(event: any) {
    this.filters.offset = (event.page - 1) * this.filters.limit!;
    this.populateCarts();
  }

  onSearch() {
    this.populateCarts();
  }

  populateCarts() {
    this.cartService.getCarts(this.filters).subscribe((carts) => {
      this.carts = carts.items;
      this.totalItems = carts.count;
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
