import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadSearchComponent } from './load-search.component';

describe('LoadSearchComponent', () => {
  let component: LoadSearchComponent;
  let fixture: ComponentFixture<LoadSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
