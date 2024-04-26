import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParteInicialComponent } from './parte-inicial.component';

describe('ParteInicialComponent', () => {
  let component: ParteInicialComponent;
  let fixture: ComponentFixture<ParteInicialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParteInicialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParteInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
