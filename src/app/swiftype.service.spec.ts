import { TestBed } from '@angular/core/testing';

import { SwiftypeService } from './swiftype.service';

describe('SwiftypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SwiftypeService = TestBed.get(SwiftypeService);
    expect(service).toBeTruthy();
  });
});
