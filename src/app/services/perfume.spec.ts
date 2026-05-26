import { TestBed } from '@angular/core/testing';

import { PerfumeService } from './perfume';

describe('Perfume', () => {
  let service: PerfumeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerfumeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
