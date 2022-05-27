import { TestBed } from '@angular/core/testing';

import { PlanningCoursesService } from './planning-courses.service';

describe('PlanningCoursesService', () => {
  let service: PlanningCoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanningCoursesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
