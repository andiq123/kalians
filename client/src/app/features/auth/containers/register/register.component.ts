import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  formGroup!: FormGroup;
  loading = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.populateForm();
    this.formGroup.valueChanges.subscribe((data) => {
      if (data.password && data.confirmPassword) {
        this.passwordMissmatch = data.password !== data.confirmPassword;
      }
    });
    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('products');
    }
  }

  populateForm() {
    this.formGroup = this.fb.group({
      username: ['', [Validators.minLength(3), Validators.required]],
      password: ['', [Validators.minLength(5), Validators.required]],
      confirmPassword: ['', [Validators.minLength(5), Validators.required]],
    });
  }

  passwordMissmatch = false;
  onSubmit() {
    const { username, password } = this.formGroup.value;
    if (this.passwordMissmatch) return;
    this.loading = true;
    this.authService
      .register(username, password)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(() => {
        this.router.navigateByUrl('products');
      });
  }
}
