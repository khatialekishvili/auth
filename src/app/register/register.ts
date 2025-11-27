import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { switchMap, EMPTY } from 'rxjs';

import { Router } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { adultValidator, matchPasswords } from 'shared/services/validators.service';
import { errorMsg } from 'shared/pipes/errorMsg';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {  MatSnackBarModule } from '@angular/material/snack-bar';

import { registerValidationMessages } from 'shared/constants/validation.messages';
import { SnackbarService } from 'shared/services/snackbar.service';

export function formatISODate(date: string): string {
  return new Date(date).toISOString().split('T')[0];
}

@Component({
  imports: [
    ReactiveFormsModule,
    errorMsg,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private snackbar = inject(SnackbarService);
  errors = registerValidationMessages;

  form = this.fb.group(
    {
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      birth_date: ['', [Validators.required, adultValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required]],
    },
    { validators: matchPasswords('password', 'confirm_password') }
  );

  hidePassword = signal(true);
  hideConfirmPassword = signal(true);

  get formControls() {
    return this.form.controls;
  }
  

register() {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  const { username, email, birth_date, password } = this.form.value;
  const formattedBirth = formatISODate(birth_date!);

  this.auth.checkUsername(username!).pipe(
      switchMap(({ data }) => {
        if (data) {
          this.snackbar.error('მომხმარებლის სახელი უკვე არსებობს, აირჩიე სხვა.');
          return EMPTY;
        }

        return this.auth.register(
          username!, email!, formattedBirth, password!
        );
      })
    )
    .subscribe(({ error }) => {
      if (error) {
        this.snackbar.error(error.message);
        return;
      }

      this.snackbar.success('რეგისტრაცია წარმატებით დასრულდა', 'OK');
      this.router.navigateByUrl('/login');
    });
}
  } 