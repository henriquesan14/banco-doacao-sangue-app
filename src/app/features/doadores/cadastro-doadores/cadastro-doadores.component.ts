import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { DoadoresService } from '../../../shared/services/doadores.service';
import { FormDoadorComponent } from '../form-doador/form-doador.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cadastro-doadores',
  standalone: true,
  imports: [FormDoadorComponent, NgxSpinnerModule],
  templateUrl: './cadastro-doadores.component.html',
  styleUrl: './cadastro-doadores.component.css'
})
export class CadastroDoadoresComponent {
  activeModal = inject(NgbActiveModal);
  subscription$!: Subscription;

  @Output() submitEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private doadoresService: DoadoresService, private toastr: ToastrService,
    private spinner: NgxSpinnerService){
  }

  ngOnDestroy(): void {
    if(this.subscription$){
      this.subscription$.unsubscribe();
    }
  }


  submit(event: any){
    this.spinner.show();
    this.subscription$ = this.doadoresService.cadastrarDoador(event).subscribe({
      next: (res) => {
        this.toastr.success('Doador cadastrado!', 'Sucesso!');
        this.submitEvent.emit();
        this.activeModal.dismiss();
      },
      error: (res) => {
        if(res.error.errors){
          for (const [key, value] of Object.entries(res.error.errors)) {
            this.toastr.error(`${key}: ${value}`, 'Erro!');
          }
          return;
        }
        this.toastr.error(`${res.error.message}`, 'Erro!');
      },
      complete: () => {
        this.spinner.hide();
      }
    });
  }
}
