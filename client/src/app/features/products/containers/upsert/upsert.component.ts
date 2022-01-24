import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductCreateDto } from '../../dto/product-create.dto';
import { ProductUpdateDto } from '../../dto/product-update.dto';

import { ProductCategory } from '../../models/product-category.interface';
import { Product } from '../../models/product.interface';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-upsert',
  templateUrl: './upsert.component.html',
  styleUrls: ['./upsert.component.scss'],
})
export class UpsertComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  apiUrl = environment.apiUrl;
  product?: Product;
  formGroup?: FormGroup;
  constructor(
    private fb: FormBuilder,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private categoriesService: CategoriesService
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }

  categories: ProductCategory[] = [];

  ngOnInit(): void {
    this.populateCategories();
    this.subscriptions.push(
      this.activeRouter.params.subscribe((params) => {
        if (params['id']) {
          this.populateForm(params['id']);
        } else {
          this.createForm();
        }
      })
    );
  }

  populateCategories() {
    this.subscriptions.push(
      this.categoriesService.getCategories().subscribe((categories) => {
        this.categories = categories;
      })
    );
  }

  populateForm(id: string) {
    this.subscriptions.push(
      this.productsService.getProduct(id).subscribe((product) => {
        this.product = product;
        this.createForm();
      })
    );
  }

  createForm() {
    this.formGroup = this.fb.group({
      id: [this.product?.id || ''],
      name: [
        this.product?.name || '',
        [Validators.required, Validators.minLength(3)],
      ],
      description: [
        this.product?.description || '',
        [Validators.required, Validators.minLength(3)],
      ],
      price: [
        this.product?.price || '',
        [Validators.required, Validators.min(1)],
      ],
      image: [],
      inStockQuantity: [
        this.product?.inStockQuantity || '',
        [Validators.required, Validators.min(1)],
      ],
      categoryId: [
        this.product?.categoryId || '',
        [Validators.required, Validators.minLength(20)],
      ],
    });
  }

  onSubmit() {
    const { id, name, description, price, inStockQuantity, categoryId, image } =
      this.formGroup!.value;

    if (this.product?.id === undefined) {
      const productDto: ProductCreateDto = {
        name,
        description,
        price,
        inStockQuantity,
        categoryId,
      };
      this.subscriptions.push(
        this.productsService
          .createProduct(productDto, image)
          .subscribe((product) => {
            this.router.navigateByUrl('/products');
          })
      );
    } else {
      const productDto: ProductUpdateDto = {
        id,
        name,
        description,
        price,
        inStockQuantity,
        categoryId,
      };
      this.subscriptions.push(
        this.productsService
          .updateProduct(productDto, image)
          .subscribe((product) => {
            this.router.navigateByUrl('/products');
          })
      );
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.formGroup!.controls['image'].setValue(file);
  }
}
