import { Injectable } from '@angular/core';
import { environment } from 'environments/environments';

export interface UploadResult {
  path: string;
  publicUrl: string;
}

export interface UploadTicket {
  cancel: () => void;
  done: Promise<UploadResult>;
}

interface LocalUpload {
  ticket: UploadTicket;
  path: string;
}

@Injectable({ providedIn: 'root' })
export class UploadService {
  private readonly supabaseUrl = environment.supabaseUrl;
  private readonly supabaseKey = environment.supabaseKey;
  private readonly bucket = environment.uploadBucket ?? 'user-uploads';
//   private readonly useSupabase = false;

  upload(file: File, onProgress: (value: number) => void): UploadTicket {
    const safeName = encodeURIComponent(file.name.replace(/\s+/g, '-'));
    const path = `${new Date().toISOString().slice(0, 10)}-${crypto.randomUUID()}-${safeName}`;
    // if (!this.useSupabase) {
    //   return this.uploadToLocal(file, path, onProgress).ticket;
    // }
    const requestUrl = `${this.supabaseUrl}/storage/v1/object/${this.bucket}/${path}`;
    const xhr = new XMLHttpRequest();

    const done = new Promise<UploadResult>((resolve, reject) => {
      xhr.upload.onprogress = (event: ProgressEvent) => {
        if (!event.lengthComputable) {
          onProgress(50);
          return;
        }
        const pct = Math.min(99, Math.round((event.loaded / event.total) * 100));
        onProgress(pct);
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          onProgress(100);
          resolve({
            path,
            publicUrl: this.publicUrl(path),
          });
          return;
        }
        console.warn(`Supabase upload failed with status ${xhr.status}, falling back to local storage`);
        const fallback = this.uploadToLocal(file, path, onProgress);
        fallback.ticket.done.then(resolve).catch(reject);
      };

      xhr.onerror = () => {
        console.warn('Network error while uploading, falling back to local storage');
        const fallback = this.uploadToLocal(file, path, onProgress);
        fallback.ticket.done.then(resolve).catch(reject);
      };
      xhr.onabort = () => reject(new Error('Upload cancelled'));

      xhr.open('POST', requestUrl);
      xhr.setRequestHeader('apikey', this.supabaseKey);
      xhr.setRequestHeader('Authorization', `Bearer ${this.supabaseKey}`);
      xhr.setRequestHeader('x-upsert', 'true');
      xhr.setRequestHeader('Content-Type', file.type || 'application/octet-stream');
      xhr.send(file);
    });

    return {
      cancel: () => xhr.abort(),
      done,
    };
  }

  private publicUrl(path: string): string {
    return `${this.supabaseUrl}/storage/v1/object/public/${this.bucket}/${path}`;
  }

  private uploadToLocal(file: File, path: string, onProgress: (value: number) => void): LocalUpload {
    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const done = new Promise<UploadResult>((resolve, reject) => {
      if (cancelled) {
        reject(new Error('Upload cancelled'));
        return;
      }

      onProgress(20);
      timeouts.push(
        setTimeout(() => {
          if (!cancelled) {
            onProgress(70);
          }
        }, 150)
      );

      timeouts.push(
        setTimeout(() => {
          if (cancelled) {
            reject(new Error('Upload cancelled'));
            return;
          }

          try {
            const blobUrl = URL.createObjectURL(file);
            console.log('Local upload (blob only):', {
              name: file.name,
              size: file.size,
              type: file.type,
              lastModified: file.lastModified,
              path: `local-${path}`,
            });
            onProgress(100);
            resolve({
              path: `local-${path}`,
              publicUrl: blobUrl,
            });
          } catch (error) {
            reject(new Error('Local upload failed'));
          }
        }, 400)
      );
    });

    return {
      path: `local-${path}`,
      ticket: {
        cancel: () => {
          cancelled = true;
          timeouts.forEach((t) => clearTimeout(t));
        },
        done,
      },
    };
  }
}

