import { TestBed } from '@angular/core/testing';

import { WeekendsService } from './weekends.service';

describe('WeekendsService', () => {
  let service: WeekendsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeekendsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
