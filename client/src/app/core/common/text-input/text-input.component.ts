import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { ProductCategory } from 'src/app/features/products/models/product-category.interface';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() label!: string;
  @Input() type: string = 'text';
  @Input() categories?: ProductCategory[];

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }
  ngOnInit(): void {}

  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
}
