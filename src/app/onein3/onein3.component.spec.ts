import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Onein3Component } from './onein3.component';

describe('Onein3Component', () => {
  let component: Onein3Component;
  let fixture: ComponentFixture<Onein3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Onein3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Onein3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
