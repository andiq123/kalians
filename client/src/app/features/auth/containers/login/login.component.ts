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
import { delay, finalize, tap, timer } from 'rxjs';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state(
        'open',
        style({
          transform: 'translateY(0)',
          opacity: 1,
        })
      ),
      state(
        'closed',
        style({
          transform: 'translateY(-100%)',
          opacity: 0,
        })
      ),
      transition('* => closed', [animate('0.5s')]),
      transition('* => open', [animate('0.5s')]),
    ]),
  ],
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;
  loading = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.populateForm();
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
      .subscribe(() => {
        this.isOpen = false;

        // this.router.navigateByUrl('products');
      });
  }
}
