import { Component, Input } from '@angular/core';
import { IXliffTransUnit } from '@vtabary/xliff2js';

@Component({
  selector: 'app-translation-navigation',
  templateUrl: './translation-navigation.component.html',
  styleUrls: ['./translation-navigation.component.scss']
})
export class TranslationNavigationComponent {
  @Input()
  public translations: IXliffTransUnit[] = [];

  @Input()
  public title: string;
}
