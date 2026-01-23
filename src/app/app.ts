import { Component, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { UploadModalComponent } from 'khatia-uploader';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet], //, UploadModalComponent
  templateUrl: './app.html',
  styleUrl: './app.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class App {
}
