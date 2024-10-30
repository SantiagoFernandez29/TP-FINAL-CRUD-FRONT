import { TestBed } from '@angular/core/testing';

import { TemaService } from './tema.service';

describe('ServiceService', () => {
  let service: TemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
