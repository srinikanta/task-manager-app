import { TestBed } from '@angular/core/testing';

import { TaskManagerLibraryService } from './task-manager-library.service';

describe('TaskManagerLibraryService', () => {
  let service: TaskManagerLibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskManagerLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
