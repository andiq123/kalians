import { Component, OnInit } from '@angular/core';
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
  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.populateCategories();
  }
  populateCategories() {
    this.subscriptions.push(
      this.categoriesService.getCategories().subscribe((categories) => {
        this.categories = categories;
      })
    );
  }

  deleteCategory(id: string) {
    this.categoriesService.deleteCategory(id).subscribe(() => {
      this.categories = this.categories.filter((x) => x.id !== id);
    });
  }

  createCategory() {
    this.categoriesService
      .createCategory(this.newCategoryValue)
      .subscribe((category) => {
        this.categories.push(category);
        this.newCategoryValue = '';
      });
  }

}
