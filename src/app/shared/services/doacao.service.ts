import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NovaDoacao } from '../../core/models/nova-doacao.interface';
import { Observable } from 'rxjs';
import { Doacao } from '../../core/models/doacao.interface';

@Injectable({
  providedIn: 'root'
})
export class DoacaoService {

  private API: string = 'http://localhost:5022';
  constructor(private http: HttpClient) { }

  cadastrarDoacao(doacao: NovaDoacao): Observable<void>{
    return this.http.post<void>(`${this.API}/api/doacao`, doacao);
  }

  buscaDoacoes(): Observable<Doacao[]>{
    return this.http.get<Doacao[]>(`${this.API}/api/doacao`);
  }
}
