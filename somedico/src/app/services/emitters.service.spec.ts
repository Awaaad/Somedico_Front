import { TestBed } from '@angular/core/testing';

import { EmittersService } from './emitters.service';

describe('EmittersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmittersService = TestBed.get(EmittersService);
    expect(service).toBeTruthy();
  });
});
