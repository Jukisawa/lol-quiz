import { TestBed } from '@angular/core/testing';

import { ScoreService } from './score';

describe('Score', () => {
  let service: ScoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
