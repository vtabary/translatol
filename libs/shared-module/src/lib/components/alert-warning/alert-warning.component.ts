import { Component, Input } from '@angular/core';
import { IXliffTransUnit } from '@vtabary/xliff2js';

@Component({
  selector: 'app-alert-warning',
  templateUrl: './alert-warning.component.html',
  styleUrls: ['./alert-warning.component.scss'],
})
export class AlertWarningComponent {
  @Input()
  public translation?: IXliffTransUnit;
}
