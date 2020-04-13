import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadCarrierComponent } from './load-carrier.component';

describe('LoadCarrierComponent', () => {
  let component: LoadCarrierComponent;
  let fixture: ComponentFixture<LoadCarrierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadCarrierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadCarrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
