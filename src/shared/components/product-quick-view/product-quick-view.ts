import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Product } from 'shared/models/product.models';
import { ProductInfoPanel } from 'shared/components/product-info-panel/product-info-panel';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-quick-view',
  imports: [MatDialogModule, ProductInfoPanel, NgClass, MatIconModule],
  templateUrl: './product-quick-view.html',
  styleUrls: ['../../../styles/mat-dialog.scss'],
})
export class ProductQuickView {

  private dialogRef = inject(MatDialogRef<ProductQuickView>);
  product = inject<Product>(MAT_DIALOG_DATA);

  private _selectedImageIndex = 0;

  get selectedImageIndex(): number {
    return this._selectedImageIndex;
  }

  set selectedImageIndex(value: number) {
    this._selectedImageIndex = value;
    this.scrollToImage(value);
  }

  private scrollToImage(index: number): void {
    setTimeout(() => {
      const element = document.getElementById(`image-${index}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);
  }

  close(): void {
    this.dialogRef.close();
  }

  onAddToCart(): void {
    this.close();
  }

}

