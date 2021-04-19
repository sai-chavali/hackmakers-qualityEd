import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSuggestionsComponent } from './course-suggestions.component';

describe('CourseSuggestionsComponent', () => {
  let component: CourseSuggestionsComponent;
  let fixture: ComponentFixture<CourseSuggestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseSuggestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
