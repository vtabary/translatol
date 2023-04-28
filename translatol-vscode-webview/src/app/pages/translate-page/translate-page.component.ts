import { Component } from '@angular/core';
import { PostMessageService } from '../../services/post-message/post-message.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-translate-page',
  templateUrl: './translate-page.component.html',
  styleUrls: ['./translate-page.component.scss'],
})
export class TranslatePageComponent {
  public content?: any;

  constructor(private activatedRoute: ActivatedRoute) {}
  /**
   * @internal
   */
  public ngOnInit(): void {
    this.activatedRoute.data.subscribe(message => {
      console.log('onMessageReceive', message);
      this.content = message;
    });
  }
}
