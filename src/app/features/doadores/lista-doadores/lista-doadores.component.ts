import { Component } from '@angular/core';
import { Doador } from '../../../core/models/doador.interface';
import { Subscription } from 'rxjs';
import { faEye, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DoadoresService } from '../../../shared/services/doadores.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-lista-doadores',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule, NgbTooltipModule],
  templateUrl: './lista-doadores.component.html',
  styleUrl: './lista-doadores.component.css'
})
export class ListaDoadoresComponent {
  subscription$!: Subscription;
  doadores: Doador[] = [];
  faPencil = faPencil;
  faTrash = faTrash;
  faEye = faEye;

  constructor(private doadorService: DoadoresService){}

  ngOnInit(): void {
    this.getDoadores();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  getDoadores(){
    this.doadorService.buscaDoadores().subscribe({
      next: (res: Doador[]) => {
        this.doadores = res;
      }
    });
  }
}
