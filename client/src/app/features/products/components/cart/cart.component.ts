import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Cart } from '../../models/cart.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  @Input() cart!: Cart;
  isCollapsed = false;

  @Output() updateStatus = new Subject<string>();
  constructor() {}

  ngOnInit(): void {}

  onUpdateStatus() {
    this.updateStatus.next(this.cart.id.toString());
  }

  getMultipliedPrice(id: string) {
    return (
      this.cart.cartItems.find((x) => x.id === id)!.product.price! *
      this.cart.cartItems.find((x) => x.id === id)!.quantity
    );
  }
}
