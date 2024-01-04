import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDoadoresComponent } from './lista-doadores.component';

describe('ListaDoadoresComponent', () => {
  let component: ListaDoadoresComponent;
  let fixture: ComponentFixture<ListaDoadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaDoadoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaDoadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
