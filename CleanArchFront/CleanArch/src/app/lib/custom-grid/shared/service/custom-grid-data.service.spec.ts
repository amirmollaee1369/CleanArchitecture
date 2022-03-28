import { TestBed } from '@angular/core/testing';

import { CustomGridDataService } from './custom-grid-data.service';

describe('CustomGridDataService', () => {
  let service: CustomGridDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomGridDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
