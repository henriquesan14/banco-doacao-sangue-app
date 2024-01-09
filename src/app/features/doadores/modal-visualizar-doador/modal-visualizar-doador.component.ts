import { Component, Input, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { DoadoresService } from '../../../shared/services/doadores.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DoadorExt } from '../../../core/models/doador-ext';
import { Doacao } from '../../../core/models/doacao.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-visualizar-doador',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-visualizar-doador.component.html',
  styleUrl: './modal-visualizar-doador.component.css'
})
export class ModalVisualizarDoadorComponent implements OnInit {
  activeModal = inject(NgbActiveModal);
  subscription$!: Subscription;

  @Input() doador!: DoadorExt;
  doacoes: Doacao[] = [];


  constructor(private doadoresService: DoadoresService){
  }

  ngOnInit(): void {
    this.getDoacoesPorDoador();
  }

  ngOnDestroy(): void {
    if(this.subscription$){
      this.subscription$.unsubscribe();
    }
  }


  getDoacoesPorDoador(){
    this.subscription$ = this.doadoresService.buscaDoacoesPorDoador(this.doador.id).subscribe({
      next: (res) => {
        this.doacoes = res;
      }
    })
  }
}
