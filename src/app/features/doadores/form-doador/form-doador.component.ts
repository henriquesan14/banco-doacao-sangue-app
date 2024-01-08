import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Doador } from '../../../core/models/doador.interface';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-form-doador',
  standalone: true,
  imports: [ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './form-doador.component.html',
  styleUrl: './form-doador.component.css'
})
export class FormDoadorComponent {
  formDoador!: FormGroup;
  @Input() doador!: Doador;
  @Output() submitEvent: EventEmitter<Doador> = new EventEmitter<Doador>();
  constructor(private formBuilder: FormBuilder){
  }

  ngOnInit(): void {
    this.formDoador = this.formBuilder.group({
      nomeCompleto: [null, [Validators.required, Validators.maxLength(200)]],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(100)]],
      dataNascimento: [null, [Validators.required]],
      genero: [null, [Validators.required]],
      peso: [null, [Validators.required]],
      tipoSanguineo: [null, [Validators.required]],
      fatorRh: [null, [Validators.required]],
      cep: [null, [Validators.required]]
    });
  }

  onSubmit(){
    if(this.formDoador.valid){
      this.submitEvent.emit(this.formDoador.value);
    }
  }

  validaCampo(field: string){
    return this.formDoador.get(field)?.touched && !this.formDoador.get(field)?.valid;
  }
}
