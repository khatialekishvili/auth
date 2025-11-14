import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { errorMsg } from 'shared/pipes/errorMsg';

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    errorMsg,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  hidePassword = signal(true);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  emailErrors = {
    required: 'იმეილი სავალდებულოა',
    email: 'არასწორი ელფოსტის ფორმატი',
  };

  passwordErrors = {
    required: 'პაროლი სავალდებულოა',
  };

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
        console.error('Login error:', error.message);
        alert('არასწორი მონაცემები ან მომხმარებელი არ არსებობს');
        return;
      }

      alert('ავტორიზაცია წარმატებით განხორციელდა!');
      this.router.navigateByUrl('/dashboard', { replaceUrl: true });
    });
  }
}