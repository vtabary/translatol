import { Component } from '@angular/core';
import { PostMessageService } from '../../services/post-message/post-message.service';

@Component({
  selector: 'app-translate-page',
  templateUrl: './translate-page.component.html',
  styleUrls: ['./translate-page.component.scss'],
})
export class TranslatePageComponent {
  public content?: string;

  constructor(private postMessageService: PostMessageService) {}
  /**
   * @internal
   */
  public ngOnInit(): void {
    this.postMessageService.onMessageReceive.subscribe(message => {
      console.log('onMessageReceive', message);
      this.content = message.content;
    });
  }
}
