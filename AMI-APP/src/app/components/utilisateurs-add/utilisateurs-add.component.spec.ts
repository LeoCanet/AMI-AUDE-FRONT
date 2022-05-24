import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisateursAddComponent } from './utilisateurs-add.component';

describe('UtilisateursAddComponent', () => {
  let component: UtilisateursAddComponent;
  let fixture: ComponentFixture<UtilisateursAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtilisateursAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilisateursAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
