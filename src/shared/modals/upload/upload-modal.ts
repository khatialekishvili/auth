import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarService } from '../../services/snackbar.service';

type AllowedMime =
  | 'image/jpeg'
  | 'application/pdf'
  | 'application/msword'
  | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

type FileKind = AllowedMime | 'blocked';
type UploadState = 'pending' | 'uploading' | 'done' | 'error';

interface UploadItem {
  id: string;
  file: File;
  name: string;
  size: number;
  kind: FileKind;
  status: UploadState;
  progress: number;
  error?: string;
}

const MAX_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_MIME: AllowedMime[] = [
  'image/jpeg',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'pdf', 'doc', 'docx'];

@Component({
  selector: 'app-upload-modal',
  imports: [CommonModule, MatIconModule, MatSnackBarModule],
  templateUrl: './upload-modal.html',
  styleUrl: './upload-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'upload-modal',
  },
})
export class UploadModalComponent {
  private readonly snackbar = inject(SnackbarService);
  private readonly dialogRef = inject(MatDialogRef<UploadModalComponent>, { optional: true });

  readonly allowMultiple = input(true);
  readonly closed = output<void>();
  readonly submitted = output<File[]>();

  readonly dragging = signal(false);
  readonly openAnim = signal(false);
  readonly mode = signal<'multi' | 'single'>('multi');
  readonly files = signal<UploadItem[]>([]);
  readonly isUploading = computed(() => false);

  readonly canSubmit = computed(() => {
    const list = this.files();
    if (list.length === 0) return false;
    if (list.some((file) => file.kind === 'blocked')) return false;
    if (list.some((file) => file.status === 'error')) return false;
    return list.every((file) => file.status === 'pending' || file.status === 'done');
  });

  constructor() {
    effect(() => {
      const allowMulti = this.allowMultiple();
      this.mode.set(allowMulti ? 'multi' : 'single');
    });
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.dragging.set(true);
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.dragging.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragging.set(false);
    const dropped = event.dataTransfer?.files;
    if (!dropped?.length) return;
    this.handleSelection(Array.from(dropped));
    this.pulseOpenAnim();
  }

  onFileInput(event: Event): void {
    const inputEl = event.target as HTMLInputElement;
    const selected = inputEl.files;
    if (!selected?.length) return;
    this.handleSelection(Array.from(selected));
    inputEl.value = '';
    this.pulseOpenAnim();
  }

  setMode(next: 'multi' | 'single'): void {
    if (!this.allowMultiple()) {
      this.mode.set('single');
      return;
    }
    this.mode.set(next);
    if (next === 'single' && this.files().length > 1) {
      const first = this.files()[0];
      this.files.set(first ? [first] : []);
    }
  }

  remove(id: string): void {
    this.files.update((list) => list.filter((file) => file.id !== id));
  }

  clear(): void {
    this.files.set([]);
  }

  submit(): void {
    if (!this.canSubmit()) return;
    const successful = this.files().filter((file) => file.status === 'done');
    const rawFiles = successful.map((file) => file.file);
    console.log('Files:', rawFiles);
    this.submitted.emit(rawFiles);
    if (this.dialogRef) {
      this.dialogRef.close(rawFiles);
    } else {
      this.closed.emit();
    }
  }

  handleClose(): void {
    this.clear();
    if (this.dialogRef) {
      this.dialogRef.close();
    } else {
      this.closed.emit();
    }
  }

  badgeLabel(kind: FileKind): string {
    if (kind === 'image/jpeg') return 'JPG';
    if (kind === 'application/pdf') return 'PDF';
    if (
      kind === 'application/msword' ||
      kind === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      return 'DOC';
    }
    return 'ERR';
  }

  formatSize(bytes: number): string {
    if (bytes < 1024) {
      return `${bytes} B`;
    }
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  private handleSelection(selected: File[]): void {
    const limitToOne = this.mode() === 'single';
    const incoming = limitToOne ? selected.slice(0, 1) : selected;
    const mapped = incoming.map((file) => this.toUploadItem(file));
    const next = limitToOne ? mapped : this.mergeUnique(mapped);
    this.files.set(limitToOne ? next : [...this.files(), ...next]);
    this.pulseOpenAnim();
  }

  private toUploadItem(file: File): UploadItem {
    const { kind, error } = this.validateFile(file);
    if (error) {
      this.snackbar.error(error);
    }

    return {
      id: crypto.randomUUID(),
      file,
      name: file.name,
      size: file.size,
      kind,
      status: error ? 'error' : 'done',
      progress: error ? 0 : 100,
      error,
    };
  }

  private validateFile(file: File): { kind: FileKind; error?: string } {
    const extension = file.name.split('.').pop()?.toLowerCase() ?? '';
    const kind = (file.type || '').toLowerCase() as AllowedMime;
    const allowedByMime = ALLOWED_MIME.includes(kind);
    const allowedByExt = ALLOWED_EXTENSIONS.includes(extension);

    if (!allowedByMime && !allowedByExt) {
      return { kind: 'blocked', error: 'File type not allowed' };
    }

    if (file.size > MAX_SIZE_BYTES) {
      return { kind: allowedByMime ? kind : 'blocked', error: 'File exceeds 5 MB' };
    }

    return { kind: allowedByMime ? kind : this.mimeFromExtension(extension) };
  }

  private mimeFromExtension(ext: string): AllowedMime {
    if (ext === 'pdf') return 'application/pdf';
    if (ext === 'doc') return 'application/msword';
    if (ext === 'docx') return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    return 'image/jpeg';
  }

  private mergeUnique(incoming: UploadItem[]): UploadItem[] {
    const existingKeys = new Set(this.files().map((file) => `${file.name}-${file.size}-${file.kind}`));
    return incoming.filter((file) => !existingKeys.has(`${file.name}-${file.size}-${file.kind}`));
  }

  private pulseOpenAnim(): void {
    this.openAnim.set(true);
    queueMicrotask(() => {
      setTimeout(() => this.openAnim.set(false), 900);
    });
  }
}

