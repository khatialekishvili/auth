import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private supabase = inject(SupabaseService);

  login(email: string, password: string) {
    return from(
      this.supabase.client.auth.signInWithPassword({
        email,
        password,
      })
    );
  }

  register(
    username: string,
    email: string,
    birthDate: string,
    password: string
  ) {
    return from(
      this.supabase.client.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: 'http://localhost:4200/login',
          data: {
            username,
            birth_date: birthDate,
          },
        },
      })
    );
  }

  checkUsername(username: string) {
    return from(
      this.supabase.client
        .from('profiles')
        .select('id')
        .eq('username', username)
        .maybeSingle()
    );
  }
}