import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunkoCodeReaderComponent } from './funko-code-reader.component';

describe('FunkoCodeReaderComponent', () => {
  let component: FunkoCodeReaderComponent;
  let fixture: ComponentFixture<FunkoCodeReaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunkoCodeReaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunkoCodeReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
