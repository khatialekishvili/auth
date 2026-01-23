import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({ providedIn: 'root' })
export class SubscriptionService {
  private readonly supabase = inject(SupabaseService);

  async emailExists(email: string): Promise<boolean> {
    const { data, error } = await this.supabase.client
      .from('profiles') 
      .select('email')
      .eq('email', email)
      .maybeSingle();

    if (error) throw error;

    return Boolean(data);
  }

  async subscribe(email: string): Promise<void> {
    const { error } = await this.supabase.client
      .from('subscribers')
      .insert({ email });

    if (error) throw error;
  }
}