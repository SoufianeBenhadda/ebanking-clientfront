import { TestBed } from '@angular/core/testing';

import { VirementsService } from './virements.service';

describe('VirementsService', () => {
  let service: VirementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VirementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
