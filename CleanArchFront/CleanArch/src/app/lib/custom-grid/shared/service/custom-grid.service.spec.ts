import { TestBed } from '@angular/core/testing';

import { CustomGridService } from './custom-grid.service';

describe('CustomGridService', () => {
  let service: CustomGridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomGridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
