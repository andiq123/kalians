import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchFiltersDto } from '../../dto/search-filters.dto';
import { ProductCategory } from '../../models/product-category.interface';
import { Product } from '../../models/product.interface';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  products: Product[] = [];
  categories: ProductCategory[] = [];
  currentPage = 1;
  totalItems = 0;

  filters = new SearchFiltersDto({
    category: '',
    limit: 10,
    offset: 0,
    name: '',
  });

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }

  ngOnInit(): void {
    this.populateCategories();
    this.populateProducts();
  }

  populateCategories() {
    this.subscriptions.push(
      this.categoriesService.getCategories().subscribe((categories) => {
        this.categories = categories;
      })
    );
  }

  onChangeCategory() {
    this.populateProducts();
  }

  onPageChange(event: any) {
    this.filters.offset = (event.page - 1) * this.filters.limit!;
    this.populateProducts();
  }

  populateProducts() {
    this.productsService
      .getProducts(this.filters)
      .subscribe((ProductsViewDto) => {
        this.totalItems = ProductsViewDto.count;
        this.products = ProductsViewDto.items;
      });
  }

  onSearch() {
    this.populateProducts();
  }

  onDeleteProduct(id: string) {
    this.subscriptions.push(
      this.productsService.deleteProduct(id).subscribe(() => {
        this.products = this.products.filter((product) => product.id !== id);
      })
    );
  }

  increment(id: string) {
    this.subscriptions.push(
      this.productsService.incrementInStockValue(id).subscribe((product) => {
        this.products = this.products.map((p) => {
          if (p.id === product.id) {
            return product;
          }
          return p;
        });
      })
    );
  }

  decrement(id: string) {
    this.subscriptions.push(
      this.productsService.decrementInStockValue(id).subscribe((product) => {
        this.products = this.products.map((p) => {
          if (p.id === product.id) {
            return product;
          }
          return p;
        });
      })
    );
  }
}
