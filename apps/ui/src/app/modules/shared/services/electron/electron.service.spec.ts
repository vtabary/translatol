import { TestBed } from '@angular/core/testing';

import { ElectronService } from './electron.service';

describe('ElectronService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  describe('#new', () => {
    it('should be created', () => {
      const service: ElectronService = TestBed.inject(ElectronService);
      expect(service).toBeTruthy();
    });
  });
});
