import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Doacao } from '../../../core/models/doacao.interface';
import { DoacaoService } from '../../../shared/services/doacao.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { faEye, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-lista-doacoes',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule, NgbTooltipModule],
  templateUrl: './lista-doacoes.component.html',
  styleUrl: './lista-doacoes.component.css'
})
export class ListaDoacoesComponent implements OnDestroy {
  subscription$!: Subscription;
  doacoes: Doacao[] = [];
  faPencil = faPencil;
  faTrash = faTrash;
  faEye = faEye;

  constructor(private doacaoService: DoacaoService){}

  ngOnInit(): void {
    this.getDoacoes();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  getDoacoes(){
    this.subscription$ = this.doacaoService.buscaDoacoes().subscribe({
      next: (res: Doacao[]) => {
        this.doacoes = res;
      }
    });
  }
}
