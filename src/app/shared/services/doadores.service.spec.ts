import { TestBed } from '@angular/core/testing';

import { DoadoresService } from './doadores.service';

describe('DoadoresService', () => {
  let service: DoadoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoadoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
