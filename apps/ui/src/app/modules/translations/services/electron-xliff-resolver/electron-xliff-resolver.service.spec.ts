import { TestBed } from '@angular/core/testing';
import { ElectronXliffResolverService } from './electron-xliff-resolver.service';

describe('Service: ElectronXliffResolverService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [],
    })
  );

  it('should be created', () => {
    const service = TestBed.inject(ElectronXliffResolverService);
    expect(service).toBeTruthy();
  });
});
