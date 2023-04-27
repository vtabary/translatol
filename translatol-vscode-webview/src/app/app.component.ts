import { Component, OnInit } from '@angular/core';
import { PostMessageService } from './services/post-message/post-message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private postMessageService: PostMessageService) {}
  /**
   * @internal
   */
  public ngOnInit(): void {
    this.postMessageService.onMessageReceive.subscribe(message => {
      console.log('onMessageReceive', message);
    });
  }
}
