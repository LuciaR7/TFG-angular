import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParteIntervencionComponent } from './parte-intervencion.component';

describe('ParteIntervencionComponent', () => {
  let component: ParteIntervencionComponent;
  let fixture: ComponentFixture<ParteIntervencionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParteIntervencionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParteIntervencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
