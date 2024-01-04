import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroDoadoresComponent } from './cadastro-doadores.component';

describe('CadastroDoadoresComponent', () => {
  let component: CadastroDoadoresComponent;
  let fixture: ComponentFixture<CadastroDoadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroDoadoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastroDoadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
