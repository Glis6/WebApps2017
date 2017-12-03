import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDrawingComponent } from './view-drawing.component';

describe('ViewDrawingComponent', () => {
  let component: ViewDrawingComponent;
  let fixture: ComponentFixture<ViewDrawingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDrawingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDrawingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
