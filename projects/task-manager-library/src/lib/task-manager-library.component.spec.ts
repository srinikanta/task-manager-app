import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskManagerLibraryComponent } from './task-manager-library.component';

describe('TaskManagerLibraryComponent', () => {
  let component: TaskManagerLibraryComponent;
  let fixture: ComponentFixture<TaskManagerLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskManagerLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskManagerLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
