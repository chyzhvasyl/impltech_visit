import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedFormComponent } from './detailed-form.component';

describe('DetailedFormComponent', () => {
  let component: DetailedFormComponent;
  let fixture: ComponentFixture<DetailedFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
