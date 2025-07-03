import { TestBed } from '@angular/core/testing';

import { NowPlayingMoviesService } from './movies-service';

describe('NowPlayingMoviesService', () => {
  let service: NowPlayingMoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NowPlayingMoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
