import { Component, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Doacao } from '../../../core/models/doacao.interface';
import { DoacaoService } from '../../../shared/services/doacao.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModal, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { faEye, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CadastroDoacoesComponent } from '../cadastro-doacoes/cadastro-doacoes.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-lista-doacoes',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule, NgbTooltipModule, NgxSpinnerModule],
  templateUrl: './lista-doacoes.component.html',
  styleUrl: './lista-doacoes.component.css'
})
export class ListaDoacoesComponent implements OnDestroy {
  subscription$!: Subscription;
  doacoes: Doacao[] = [];
  faPencil = faPencil;
  faTrash = faTrash;
  faEye = faEye;

  private modalService = inject(NgbModal);

  constructor(private doacaoService: DoacaoService, private spinner: NgxSpinnerService){}

  ngOnInit(): void {
    this.getDoacoes();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  getDoacoes(){
    this.spinner.show();
    this.subscription$ = this.doacaoService.buscaDoacoes().subscribe({
      next: (res: Doacao[]) => {
        this.doacoes = res;
      },
      complete: () => {
        this.spinner.hide();
      }
    });
  }

  open() {
		const modalRef = this.modalService.open(CadastroDoacoesComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.submitEvent.subscribe((e: any) => {
     this.getDoacoes();
    });
	}
}
