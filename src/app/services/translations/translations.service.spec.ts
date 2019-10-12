import { TestBed } from '@angular/core/testing';

import { TranslationsService } from './translations.service';
import { NgxElectronModule } from 'ngx-electron';

describe('TranslationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ NgxElectronModule ],
  }));

  it('should be created', () => {
    const service: TranslationsService = TestBed.get(TranslationsService);
    expect(service).toBeTruthy();
  });
});
