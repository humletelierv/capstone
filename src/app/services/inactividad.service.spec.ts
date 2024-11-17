import { TestBed } from '@angular/core/testing';

import { InactividadService } from './inactividad.service';

describe('InactividadService', () => {
  let service: InactividadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InactividadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
