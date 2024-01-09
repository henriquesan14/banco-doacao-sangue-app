import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Doador } from '../../../core/models/doador.interface';
import { NgxMaskDirective } from 'ngx-mask';
import { DoadorExt } from '../../../core/models/doador-ext';

@Component({
  selector: 'app-form-doador',
  standalone: true,
  imports: [ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './form-doador.component.html',
  styleUrl: './form-doador.component.css'
})
export class FormDoadorComponent {
  formDoador!: FormGroup;
  @Input() doador!: DoadorExt;
  @Output() submitEvent: EventEmitter<Doador> = new EventEmitter<Doador>();
  constructor(private formBuilder: FormBuilder){
  }

  ngOnInit(): void {
    
    this.formDoador = this.formBuilder.group({
      id: [null],
      nomeCompleto: [null, [Validators.required, Validators.maxLength(200)]],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(100)]],
      dataNascimento: [null, [Validators.required]],
      genero: [null, [Validators.required]],
      peso: [null, [Validators.required]],
      tipoSanguineo: [null, [Validators.required]],
      fatorRh: [null, [Validators.required]],
      cep: [null, [Validators.required]]
    });
    if(this.doador){
      this.formDoador.get('id')?.setValue(this.doador.id);
      this.formDoador.get('nomeCompleto')?.setValue(this.doador.nomeCompleto);
      this.formDoador.get('email')?.setValue(this.doador.email);
      let data = new Date(this.doador.dataNascimento);
      this.formDoador.get('dataNascimento')?.setValue(data.toISOString().split('T')[0]);
      this.formDoador.get('genero')?.setValue(this.doador.genero);
      this.formDoador.get('peso')?.setValue(this.doador.peso);
      this.formDoador.get('tipoSanguineo')?.setValue(this.doador.tipoSanguineo);
      this.formDoador.get('fatorRh')?.setValue(this.doador.fatorRh);
      this.formDoador.get('cep')?.setValue(this.doador.endereco.cep);
    }
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
