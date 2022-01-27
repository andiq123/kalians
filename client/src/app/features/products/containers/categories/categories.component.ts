import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ProductCategory } from '../../models/product-category.interface';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  subscriptions: Subscription[] = [];
  categories: ProductCategory[] = [];
  newCategoryValue: string = '';
  constructor(
    private categoriesService: CategoriesService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.populateCategories();
  }

  populateCategories() {
    this.subscriptions.push(
      this.categoriesService.getCategories().subscribe({
        next: (categories) => {
          this.categories = categories;
        },
        error: (err) => {
          this.toastr.error(err.error.message);
        },
      })
    );
  }

  deleteCategory(id: string) {
    this.categoriesService.deleteCategory(id).subscribe({
      next: () => {
        this.categories = this.categories.filter((x) => x.id !== id);
      },
      error: (err) => {
        this.toastr.error(err.error.message);
      },
    });
  }

  createCategory() {
    this.categoriesService.createCategory(this.newCategoryValue).subscribe({
      next: (category) => {
        this.categories.push(category);
        this.newCategoryValue = '';
      },
      error: (err) => {
        console.log(err);
        this.toastr.error(err.error.message);
      },
    });
  }
}
