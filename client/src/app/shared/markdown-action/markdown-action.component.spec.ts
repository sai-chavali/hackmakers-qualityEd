import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MarkdownActionDialog } from './markdown-action.component';

describe('MarkdownActionDialog', () => {
  let component: MarkdownActionDialog;
  let fixture: ComponentFixture<MarkdownActionDialog>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkdownActionDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkdownActionDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
