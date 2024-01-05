import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RelatorioEstoqueSangue } from '../../core/models/relatorio-estoque-sangue';

@Injectable({
  providedIn: 'root'
})
export class EstoqueSangueService {

  private API: string = 'http://localhost:5022';
  constructor(private http: HttpClient) { }

  relatorioEstoqueSangue(): Observable<RelatorioEstoqueSangue[]>{
    return this.http.get<RelatorioEstoqueSangue[]>(`${this.API}/api/estoquesangue`);
  }
}
