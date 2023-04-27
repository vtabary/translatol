import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert-warning',
  templateUrl: './alert-warning.component.html',
  styleUrls: ['./alert-warning.component.scss'],
})
export class AlertWarningComponent {
  @Input()
  public text: string;
}
