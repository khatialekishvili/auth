import { Component, inject } from '@angular/core';
import { Header } from "./header/header";
import { RouterOutlet } from "@angular/router";
import { Footer } from "./footer/footer";
import { UiStateService } from 'shared/services/ui-state.service';

@Component({
  selector: 'app-layout',
  imports: [Header, RouterOutlet, Footer],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  announcementText = 'Complimentary U.S. No-Rush Shipping on orders of $95+';
  repeatCount = Array(10).fill(0);
  
  protected readonly uiState = inject(UiStateService);
}
