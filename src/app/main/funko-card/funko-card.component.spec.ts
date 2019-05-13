import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunkoCardComponent } from './funko-card.component';

describe('FunkoCardComponent', () => {
  let component: FunkoCardComponent;
  let fixture: ComponentFixture<FunkoCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunkoCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunkoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
