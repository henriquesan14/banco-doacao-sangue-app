import { TestBed } from '@angular/core/testing';

import { EstoqueSangueService } from './estoque-sangue.service';

describe('EstoqueSangueService', () => {
  let service: EstoqueSangueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstoqueSangueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
