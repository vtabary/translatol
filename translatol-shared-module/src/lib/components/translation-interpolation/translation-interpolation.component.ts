import { Component, Input } from '@angular/core';
import { IXliffInterpolation } from '@vtabary/xliff2js';

@Component({
  selector: 'app-translation-interpolation',
  templateUrl: './translation-interpolation.component.html',
  styleUrls: ['./translation-interpolation.component.scss'],
})
export class TranslationInterpolationComponent {
  @Input()
  public interpolation: IXliffInterpolation;
}
