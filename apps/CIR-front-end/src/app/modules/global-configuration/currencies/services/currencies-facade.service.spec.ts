import { TestBed } from '@angular/core/testing';

import { CurrenciesFacadeService } from './currencies-facade.service';

describe('CurrenciesFacadeService', () => {
  let service: CurrenciesFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrenciesFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
