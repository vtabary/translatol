import { TestBed } from '@angular/core/testing';
import { TreeBuilderService } from './tree-builder.service';

describe('TreeBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [  ],
  }));

  it('should be created', () => {
    const service: TreeBuilderService = TestBed.get(TreeBuilderService);
    expect(service).toBeTruthy();
  });
});
