import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { UiStateService } from 'shared/services/ui-state.service';

@Component({
  selector: 'app-header',
  imports: [NgOptimizedImage,],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  readonly isSearchOpen = signal(false);
  // readonly isSearchOpen = signal(true);
  private readonly uiState = inject(UiStateService);

  openSearch(): void {
    if (this.isSearchOpen()) {
      return;
    }

    this.isSearchOpen.set(true);
    this.uiState.showSearchOverlay();
  }

  closeSearch(): void {
    if (!this.isSearchOpen()) {
      return;
    }

    this.isSearchOpen.set(false);
    this.uiState.hideSearchOverlay();
  }

  toggleSearch(): void {
    if (this.isSearchOpen()) {
      this.closeSearch();
    } else {
      this.openSearch();
    }
  }
}
