import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { RouterModule } from '@angular/router';
import { TextInputComponent } from './common/text-input/text-input.component';
import { ReactiveFormsModule } from '@angular/forms';

const BootstrapComponents = [
  BsDropdownModule.forRoot(),
  PaginationModule.forRoot(),
];

@NgModule({
  declarations: [SidebarComponent, TextInputComponent],
  imports: [
    CommonModule,
    BootstrapComponents,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    SidebarComponent,
    ReactiveFormsModule,
    BootstrapComponents,
    RouterModule,
    TextInputComponent,
    HttpClientModule,
  ],
})
export class CoreModule {}
