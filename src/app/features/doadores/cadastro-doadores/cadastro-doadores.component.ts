import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DoadoresService } from '../../../shared/services/doadores.service';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-cadastro-doadores',
  standalone: true,
  imports: [ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './cadastro-doadores.component.html',
  styleUrl: './cadastro-doadores.component.css'
})
export class CadastroDoadoresComponent {
  subscription$!: Subscription;
  formDoador!: FormGroup;
  constructor(private doadoresService: DoadoresService, private formBuilder: FormBuilder){
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

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }


  onSubmit(){
    if(this.formDoador.valid){
      this.doadoresService.cadastrarDoador(this.formDoador.value).subscribe({
        next: (res) => {
          alert('cadastrou');
          this.formDoador.reset();
        }
      })
    }
  }

  validaCampo(field: string){
    return this.formDoador.get(field)?.touched && !this.formDoador.get(field)?.valid;
  }
}
