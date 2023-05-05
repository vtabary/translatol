import { Component } from '@angular/core';

@Component({
  selector: 'translatol-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  text = 'some text';
  otherText = 'other text';
  aNumber = 10;
  gender?: 'male' | 'female' | 'other';
}
