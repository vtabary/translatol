import { TestBed } from '@angular/core/testing';
import { PathService } from './path.service';

describe('PathService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [],
    })
  );

  it('should be created', () => {
    const service: PathService = TestBed.get(PathService);
    expect(service).toBeTruthy();
  });
});
