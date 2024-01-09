import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { DoadoresService } from '../../../shared/services/doadores.service';
import { FormDoadorComponent } from '../form-doador/form-doador.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cadastro-doadores',
  standalone: true,
  imports: [FormDoadorComponent],
  templateUrl: './cadastro-doadores.component.html',
  styleUrl: './cadastro-doadores.component.css'
})
export class CadastroDoadoresComponent {
  activeModal = inject(NgbActiveModal);
  subscription$!: Subscription;

  @Output() submitEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private doadoresService: DoadoresService){
  }

  ngOnDestroy(): void {
    if(this.subscription$){
      this.subscription$.unsubscribe();
    }
  }


  submit(event: any){
    this.subscription$ = this.doadoresService.cadastrarDoador(event).subscribe({
      next: (res) => {
        this.submitEvent.emit();
        this.activeModal.dismiss();
      }
    });
  }
}
