import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environments';


@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase = createClient(
    environment.supabaseUrl,
    environment.supabaseKey
  );

  get client() {
    return this.supabase;
  }

  async uploadFile(file: File, bucket: string = 'uploads') {
    const filePath = `${Date.now()}_${file.name}`;
    
    // Supabase JS-ს არ აქვს ჩაშენებული პროგრესის observable მარტივი ატვირთვისთვის,
    // ამიტომ აქ ვიყენებთ მარტივ Promise-ს.
    const { data, error } = await this.supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (error) throw error;
    return data;
  }
  
  get user() {
    return this.supabase.auth.getUser();
  }

}