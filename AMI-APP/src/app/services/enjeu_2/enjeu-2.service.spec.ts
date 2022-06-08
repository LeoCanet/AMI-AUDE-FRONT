import { TestBed } from '@angular/core/testing';

import { Enjeu2Service } from './enjeu-2.service';

describe('Enjeu2Service', () => {
  let service: Enjeu2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Enjeu2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
