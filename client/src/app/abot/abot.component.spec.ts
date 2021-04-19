import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbotComponent } from './abot.component';

describe('AbotComponent', () => {
  let component: AbotComponent;
  let fixture: ComponentFixture<AbotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
