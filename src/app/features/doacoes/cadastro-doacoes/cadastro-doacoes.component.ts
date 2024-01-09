import { Component, EventEmitter, Output, ViewChild, inject } from '@angular/core';
import { DoadoresService } from '../../../shared/services/doadores.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { NgxMaskDirective } from 'ngx-mask';
import { SelectAutocompleteComponent } from '../../../shared/components/select-autocomplete/select-autocomplete.component';
import { Doador } from '../../../core/models/doador.interface';
import { DoacaoService } from '../../../shared/services/doacao.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastro-doacoes',
  standalone: true,
  imports: [ReactiveFormsModule, NgxMaskDirective, SelectAutocompleteComponent],
  templateUrl: './cadastro-doacoes.component.html',
  styleUrl: './cadastro-doacoes.component.css'
})
export class CadastroDoacoesComponent {
  subscription$!: Subscription;
  formDoacao!: FormGroup;
  doadores: Doador[] = [];
  @ViewChild(SelectAutocompleteComponent) selectAutoCompleteComponent!: SelectAutocompleteComponent;

  @Output() submitEvent: EventEmitter<void> = new EventEmitter<void>();

  activeModal = inject(NgbActiveModal);

  constructor(private doadoresService: DoadoresService, private doacaoService: DoacaoService, private formBuilder: FormBuilder,
    private toastr: ToastrService){
  }

  ngOnInit(): void {
    this.getDoadores();
    this.formDoacao = this.formBuilder.group({
      doadorId: [null, [Validators.required]],
      quantidadeMl: [null, [Validators.required]]
    });
  }

  resetarSelectAutoComplete(): void {
    if (this.selectAutoCompleteComponent) {
      this.selectAutoCompleteComponent.resetSelectedItem(); // Chama a função reset() do componente filho
    }
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  doadorSelected(doador: Doador){
    if(doador){
      this.formDoacao.get('doadorId')?.setValue(doador.id);
    }
  }
    

  getDoadores(){
    this.subscription$ = this.doadoresService.buscaDoadores().subscribe({
      next: (res) => {
        this.doadores = res;
      }
    });
  }


  onSubmit(){
    if(this.formDoacao.valid){
      this.doacaoService.cadastrarDoacao(this.formDoacao.value).subscribe({
        next: (res) => {
          this.toastr.success('Doação cadastrada!', 'Sucesso!');
          this.resetarSelectAutoComplete();
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
        }
      })
    }
  }

  validaCampo(field: string){
    return this.formDoacao.get(field)?.touched && !this.formDoacao.get(field)?.valid;
  }


  
}
