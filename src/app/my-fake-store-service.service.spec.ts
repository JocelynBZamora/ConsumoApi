import { TestBed } from '@angular/core/testing';

import { MyFakeStoreServiceService } from './my-fake-store-service.service';

describe('MyFakeStoreServiceService', () => {
  let service: MyFakeStoreServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyFakeStoreServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
