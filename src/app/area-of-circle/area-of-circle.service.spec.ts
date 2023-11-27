import { TestBed } from '@angular/core/testing';

import { AreaOfCircleService } from './area-of-circle.service';

describe('AreaOfCircleService', () => {
  let service: AreaOfCircleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AreaOfCircleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
