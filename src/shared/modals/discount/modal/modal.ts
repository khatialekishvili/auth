import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-discount-modal',
  templateUrl: './modal.html',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Modal {
  private fb = new FormBuilder();
  private dialogRef = inject(MatDialogRef<Modal>);


  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });


  submit() {
    if (this.form.invalid) return;
    localStorage.setItem('discountUnlocked', 'true');
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}