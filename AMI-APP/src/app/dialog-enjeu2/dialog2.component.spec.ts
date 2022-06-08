import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogComponent2 } from './dialog2.component';

describe('DialogComponent2', () => {
  let component: DialogComponent2;
  let fixture: ComponentFixture<DialogComponent2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogComponent2 ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
