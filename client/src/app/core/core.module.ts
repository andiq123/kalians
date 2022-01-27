import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { RouterModule } from '@angular/router';
import { TextInputComponent } from './common/text-input/text-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CollapseModule } from 'ngx-bootstrap/collapse';

const BootstrapComponents = [
  BsDropdownModule.forRoot(),
  PaginationModule.forRoot(),
  CollapseModule.forRoot(),
];

@NgModule({
  declarations: [SidebarComponent, TextInputComponent],
  imports: [
    CommonModule,
    BootstrapComponents,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  exports: [
    SidebarComponent,
    ReactiveFormsModule,
    BootstrapComponents,
    RouterModule,
    TextInputComponent,
    HttpClientModule,
    ToastrModule,
  ],
})
export class CoreModule {}
