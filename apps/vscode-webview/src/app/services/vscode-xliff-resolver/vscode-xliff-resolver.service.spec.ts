import { TestBed } from '@angular/core/testing';
import { TranslationsService } from './translations.service';

describe('TranslationsService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [],
    })
  );

  it('should be created', () => {
    const service: TranslationsService = TestBed.get(TranslationsService);
    expect(service).toBeTruthy();
  });
});
