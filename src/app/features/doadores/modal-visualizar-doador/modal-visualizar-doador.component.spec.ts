import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVisualizarDoadorComponent } from './modal-visualizar-doador.component';

describe('ModalVisualizarDoadorComponent', () => {
  let component: ModalVisualizarDoadorComponent;
  let fixture: ComponentFixture<ModalVisualizarDoadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalVisualizarDoadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalVisualizarDoadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
