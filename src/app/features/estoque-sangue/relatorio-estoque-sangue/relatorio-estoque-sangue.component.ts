import { Component, OnInit } from '@angular/core';
import { EstoqueSangueService } from '../../../shared/services/estoque-sangue.service';
import { RelatorioEstoqueSangue } from '../../../core/models/relatorio-estoque-sangue';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-relatorio-estoque-sangue',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './relatorio-estoque-sangue.component.html',
  styleUrl: './relatorio-estoque-sangue.component.css'
})
export class RelatorioEstoqueSangueComponent implements OnInit {

  constructor(private estoqueSangueService: EstoqueSangueService){}
  estoqueSangue$: Observable<RelatorioEstoqueSangue[]> = new Observable<RelatorioEstoqueSangue[]>;

  ngOnInit(): void {
    this.relatorioEstoqueSangue();
  }

  relatorioEstoqueSangue(){
    this.estoqueSangue$ = this.estoqueSangueService.relatorioEstoqueSangue();
  }

  getSituacao(quantidadeMl: number){
    if(quantidadeMl <= 500){
        return 'critico';
    }else if(quantidadeMl <= 2000){
      return 'alerta';
    }
    return 'estavel';
  }

}
