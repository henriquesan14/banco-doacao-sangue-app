import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doador } from '../../core/models/doador.interface';
import { DoadorExt } from '../../core/models/doador-ext';

@Injectable({
  providedIn: 'root'
})
export class DoadoresService {

  private API: string = 'http://localhost:5022';
  constructor(private http: HttpClient) { }

  cadastrarDoador(doador: Doador): Observable<void>{
    return this.http.post<void>(`${this.API}/api/doador`, doador);
  }

  buscaDoadores(): Observable<Doador[]>{
    return this.http.get<Doador[]>(`${this.API}/api/doador`);
  }

  atualizarDoador(doador: Doador): Observable<void>{
    return this.http.put<void>(`${this.API}/api/doador`, doador);
  }

  buscaDoador(id: number): Observable<DoadorExt>{
    return this.http.get<DoadorExt>(`${this.API}/api/doador/${id}`);
  }
}
