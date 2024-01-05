import { Component, OnInit } from '@angular/core';
import { EstoqueSangueService } from '../../../shared/services/estoque-sangue.service';
import { RelatorioEstoqueSangue } from '../../../core/models/relatorio-estoque-sangue';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-relatorio-estoque-sangue',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './relatorio-estoque-sangue.component.html',
  styleUrl: './relatorio-estoque-sangue.component.css'
})
export class RelatorioEstoqueSangueComponent implements OnInit {

  constructor(private estoqueSangueService: EstoqueSangueService){}
  estoqueSangue: RelatorioEstoqueSangue[] = [];

  ngOnInit(): void {
    this.relatorioEstoqueSangue();
  }

  relatorioEstoqueSangue(){
    this.estoqueSangueService.relatorioEstoqueSangue().subscribe({
      next: (res: RelatorioEstoqueSangue []) => {
        this.estoqueSangue = res
      }
    });
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
