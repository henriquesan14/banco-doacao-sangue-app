import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioEstoqueSangueComponent } from './relatorio-estoque-sangue.component';

describe('RelatorioEstoqueSangueComponent', () => {
  let component: RelatorioEstoqueSangueComponent;
  let fixture: ComponentFixture<RelatorioEstoqueSangueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatorioEstoqueSangueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RelatorioEstoqueSangueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
