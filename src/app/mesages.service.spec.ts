import { TestBed } from '@angular/core/testing';

import { MesagesService } from './mesages.service';

describe('MesagesService', () => {
  let service: MesagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MesagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
