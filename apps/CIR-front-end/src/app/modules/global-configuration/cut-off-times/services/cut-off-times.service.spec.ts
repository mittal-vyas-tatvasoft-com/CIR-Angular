import { TestBed } from '@angular/core/testing';

import { CutOffTimesService } from './cut-off-times.service';

describe('CutOffTimesService', () => {
  let service: CutOffTimesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CutOffTimesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
