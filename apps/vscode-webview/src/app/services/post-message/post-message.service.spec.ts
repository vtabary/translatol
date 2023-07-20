import { TestBed } from '@angular/core/testing';

import { PostMessageService } from './post-message.service';

describe('PostMessageService', () => {
  let service: PostMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
