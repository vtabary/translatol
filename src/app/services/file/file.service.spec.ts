import { TestBed } from '@angular/core/testing';

import { FileService } from './file.service';
import { NgxElectronModule } from 'ngx-electron';

describe('FileService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ NgxElectronModule ],
  }));

  it('should be created', () => {
    const service: FileService = TestBed.get(FileService);
    expect(service).toBeTruthy();
  });
});
