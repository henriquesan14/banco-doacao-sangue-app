import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroDoacoesComponent } from './cadastro-doacoes.component';

describe('CadastroDoacoesComponent', () => {
  let component: CadastroDoacoesComponent;
  let fixture: ComponentFixture<CadastroDoacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroDoacoesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastroDoacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
