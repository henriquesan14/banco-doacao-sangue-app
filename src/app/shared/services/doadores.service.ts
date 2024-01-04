import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doador } from '../../core/models/doador.interface';

@Injectable({
  providedIn: 'root'
})
export class DoadoresService {

  private API: string = 'http://localhost:5022';
  constructor(private http: HttpClient) { }

  cadastrarDoador(doador: Doador): Observable<void>{
    return this.http.post<void>(`${this.API}/api/doador`, doador);
  }
}
