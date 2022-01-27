import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;
  loading = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.populateForm();
    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('products');
    }
  }

  populateForm() {
    this.formGroup = this.fb.group({
      username: ['', [Validators.minLength(3), Validators.required]],
      password: ['', [Validators.minLength(5), Validators.required]],
    });
  }

  isOpen = true;
  onSubmit() {
    const { username, password } = this.formGroup.value;
    this.loading = true;
    this.authService
      .login(username, password)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: () => {
          this.isOpen = false;
          this.router.navigateByUrl('products');
        },
        error: (err) => {
          this.toastr.error(err.error.message);
        },
      });
  }
}
