import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Enjeu2Component } from './enjeu2.component';

describe('Enjeu2Component', () => {
  let component: Enjeu2Component;
  let fixture: ComponentFixture<Enjeu2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Enjeu2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Enjeu2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
