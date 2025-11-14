import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { errorMsg } from 'shared/pipes/errorMsg';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


export function adultValidator(control: AbstractControl): ValidationErrors | null {
  const birthDate = new Date(control.value);
  if (isNaN(birthDate.getTime())) return null;

  const today = new Date();
  const age =
    today.getFullYear() - birthDate.getFullYear() -
    (today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
      ? 1
      : 0);

  return age >= 18 ? null : { min: true };
}

export function matchPasswords(passwordKey: string, confirmKey: string) {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const group = formGroup as any;
    const password = group.get(passwordKey);
    const confirm = group.get(confirmKey);

    if (password && confirm && password.value !== confirm.value) {
      confirm.setErrors({ mismatch: true });
    } else {
      confirm.setErrors(null);
    }
    return null;
  };
}

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    errorMsg,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

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

  usernameErrors = {
    required: 'მომხმარებლის სახელი სავალდებულოა',
    minlength: 'მინიმუმ 3 სიმბოლოა საჭირო',
  };

  emailErrors = {
    required: 'იმეილი სავალდებულოა',
    email: 'არასწორი ელფოსტის ფორმატი',
  };

  birthDateErrors = {
    required: 'დაბადების თარიღი სავალდებულოა',
    min: 'უნდა იყოთ 18 წლის ან მეტის',
  };

  passwordErrors = {
    required: 'პაროლი სავალდებულოა',
    minlength: 'პაროლი უნდა შეიცავდეს მინ. 6 სიმბოლოს',
  };

  confirmPasswordErrors = {
    required: 'გაიმეორე პაროლი',
    mismatch: 'პაროლები არ ემთხვევა',
  };

  get formControls() {
    return this.form.controls;
  }

register() {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  const { username, email, birth_date, password } = this.form.value;
  const formattedBirthDate = new Date(birth_date!).toISOString().split('T')[0];

  this.auth.register(
    username!,
    email!,
    formattedBirthDate,
    password!
  )
    .subscribe(({ error }) => {
      if (error) {
        console.error('Sign-up error:', error);

        alert('დაფიქსირდა შეცდომა: ' + error.message);
        return;
      }

      alert('რეგისტრაცია წარმატებით დასრულდა! შეამოწმეთ ელფოსტა დადასტურებისთვის.');
      this.router.navigateByUrl('/login');
    });
}
}