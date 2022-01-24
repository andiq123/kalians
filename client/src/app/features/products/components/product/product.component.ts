import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  apiUrl = environment.apiUrl;
  @Input() product!: Product;
  @Output() increment = new Subject<string>();
  @Output() decrement = new Subject<string>();

  @Output() onDeleteProduct = new Subject<string>();

  minValue = 0;
  constructor() {}

  ngOnInit(): void {}

  onDelete() {
    this.onDeleteProduct.next(this.product.id);
  }

  incrementLoading = false;
  onIncrement() {
    this.increment.next(this.product.id);
  }

  onDecrement() {
    if (this.product.inStockQuantity < this.minValue + 1) return;
    this.decrement.next(this.product.id);
  }
}
