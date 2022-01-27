import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './containers/products/products.component';
import { UpsertComponent } from './containers/upsert/upsert.component';
import { CategoriesComponent } from './containers/categories/categories.component';
import { CartsComponent } from './containers/carts/carts.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'create', component: UpsertComponent },
  { path: 'edit/:id', component: UpsertComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'carts', component: CartsComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
