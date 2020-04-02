import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadCriteriaComponent } from './load-criteria.component';

describe('LoadCriteriaComponent', () => {
  let component: LoadCriteriaComponent;
  let fixture: ComponentFixture<LoadCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
