import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './containers/products/products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductComponent } from './components/product/product.component';
import { FormsModule } from '@angular/forms';
import { UpsertComponent } from './containers/upsert/upsert.component';
import { CoreModule } from 'src/app/core/core.module';
import { CategoriesComponent } from './containers/categories/categories.component';
import { CartsComponent } from './containers/carts/carts.component';
import { CartComponent } from './components/cart/cart.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent,
    UpsertComponent,
    CategoriesComponent,
    CartsComponent,
    CartComponent,
  ],
  imports: [CommonModule, ProductsRoutingModule, FormsModule, CoreModule],
})
export class ProductsModule {}
