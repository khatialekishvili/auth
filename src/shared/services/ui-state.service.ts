import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UiStateService {
  private readonly _searchOverlayActive = signal(false);
  readonly searchOverlayActive = this._searchOverlayActive.asReadonly();

  showSearchOverlay(): void {
    this._searchOverlayActive.set(true);
  }

  hideSearchOverlay(): void {
    this._searchOverlayActive.set(false);
  }
}

