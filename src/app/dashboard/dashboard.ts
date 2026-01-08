import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UploadModalComponent } from 'shared/modals/upload/upload-modal';

@Component({
  selector: 'app-dashboard',
  imports: [MatDialogModule],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private readonly dialog = inject(MatDialog);

  openUpload(): void {
    this.dialog.open(UploadModalComponent, {
      panelClass: 'upload-dialog-panel',
      maxWidth: '840px',
      width: '100%',
      autoFocus: false,
    });
  }
}
