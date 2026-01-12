import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-discount-dialog',
  templateUrl: './dialog.html',
  imports: [ReactiveFormsModule, MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscountDialog {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<DiscountDialog>);

  emailControl = new FormControl('', [Validators.required, Validators.email]);

  submit() {
    if (this.emailControl.invalid) return;
    localStorage.setItem('discountUnlocked', 'true');
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}

