import { TestBed } from '@angular/core/testing';

import { NavFacadeService } from './nav-facade.service';

describe('NavFacadeService', () => {
  let service: NavFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
