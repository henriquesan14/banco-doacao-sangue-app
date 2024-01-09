import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicaoDoadoresComponent } from './edicao-doadores.component';

describe('EdicaoDoadoresComponent', () => {
  let component: EdicaoDoadoresComponent;
  let fixture: ComponentFixture<EdicaoDoadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdicaoDoadoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EdicaoDoadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
