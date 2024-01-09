import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DoadoresService } from '../../../shared/services/doadores.service';
import { Subscription } from 'rxjs';
import { FormDoadorComponent } from '../form-doador/form-doador.component';
import { DoadorExt } from '../../../core/models/doador-ext';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edicao-doadores',
  standalone: true,
  imports: [FormDoadorComponent, NgxSpinnerModule],
  templateUrl: './edicao-doadores.component.html',
  styleUrl: './edicao-doadores.component.css'
})
export class EdicaoDoadoresComponent {
  activeModal = inject(NgbActiveModal);
  subscription$!: Subscription;
  @Input() doador!: DoadorExt;

  @Output() submitEvent: EventEmitter<void> = new EventEmitter<void>();
  
  constructor(private doadoresService: DoadoresService, private spinner: NgxSpinnerService,
    private toastr: ToastrService){
  }

  ngOnDestroy(): void {
    if(this.subscription$){
      this.subscription$.unsubscribe();
    }
  }


  submit(event: any){
    this.spinner.show();
    this.subscription$ = this.doadoresService.atualizarDoador(event).subscribe({
      next: (res) => {
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
