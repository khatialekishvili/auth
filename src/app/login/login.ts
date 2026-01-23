import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { errorMsg } from 'shared/pipes/errorMsg';

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { loginValidationMessages } from 'shared/constants/validation.messages';
import { SnackbarService } from 'shared/services/snackbar.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    errorMsg,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './login.html',
})
export class Login {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private snackbar = inject(SnackbarService);   

  hidePassword = signal(true);

  errors = loginValidationMessages;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  get formControls() {
    return this.form.controls;
  }

  login() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.value;

    this.auth.login(email!, password!).subscribe(({ error }) => {
      if (error) {
        this.snackbar.error('Authorization failed or user deosnt exist. Please check your credentials and try again.');
        return;
      }

      this.snackbar.success('Login successful!');
      this.router.navigateByUrl('/', { replaceUrl: true });
    });
  }
}