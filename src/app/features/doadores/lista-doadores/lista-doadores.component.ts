import { Component, OnDestroy, inject } from '@angular/core';
import { Doador } from '../../../core/models/doador.interface';
import { Subscription } from 'rxjs';
import { faEye, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DoadoresService } from '../../../shared/services/doadores.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModal, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CadastroDoadoresComponent } from '../cadastro-doadores/cadastro-doadores.component';
import { EdicaoDoadoresComponent } from '../edicao-doadores/edicao-doadores.component';
import { ModalVisualizarDoadorComponent } from '../modal-visualizar-doador/modal-visualizar-doador.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-lista-doadores',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule, NgbTooltipModule, NgxSpinnerModule],
  templateUrl: './lista-doadores.component.html',
  styleUrl: './lista-doadores.component.css'
})
export class ListaDoadoresComponent implements OnDestroy {
  subscription$!: Subscription;
  doadores: Doador[] = [];
  faPencil = faPencil;
  faTrash = faTrash;
  faEye = faEye;

  private modalService = inject(NgbModal);

  constructor(private doadorService: DoadoresService, private spinner: NgxSpinnerService){}

  ngOnInit(): void {
    this.getDoadores();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  getDoadores(){
    this.spinner.show();
    this.subscription$ = this.doadorService.buscaDoadores().subscribe({
      next: (res: Doador[]) => {
        this.doadores = res;
      },
      complete: () => {
        this.spinner.hide();
      }
    });
  }

  atualizaDoador(id: number){
    this.doadorService.buscaDoador(id).subscribe({
      next: (res: any) => {
        this.openModalEdicao(res);
      }
    })
  }

  open() {
		const modalRef = this.modalService.open(CadastroDoadoresComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.submitEvent.subscribe((e: any) => {
     this.getDoadores();
    });
	}

  openModalEdicao(doador: any){
    const modalRef = this.modalService.open(EdicaoDoadoresComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.doador = doador;
    modalRef.componentInstance.submitEvent.subscribe((e: any) => {
     this.getDoadores();
    });
  }

  openModalVisualizar(doador: any){
    const modalRef = this.modalService.open(ModalVisualizarDoadorComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.doador = doador;
  }
}
