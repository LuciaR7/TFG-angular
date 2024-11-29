import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Parte } from '../interfaces/parte.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ParteService {

  url: string = `${environment.baseUrl}/partes`

  constructor(
    private http: HttpClient
  ) {}

  list(){
    return this.http.get<Parte[]>(this.url);
  }

  get(id: number){
    return this.http.get<Parte>(`${this.url}/${id}`);
  }

  create(parte: Parte){
    return this.http.post<Parte>(this.url, parte);
  }

  update(id: number, parte: Parte){
    return this.http.put<Parte>(`${this.url}/${id}`, parte);
  }

  delete(id: number){
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  // Método para obtener PARTES por ID de usuario
  getPartesByUsuarioId(usuarioId: number): Observable<Parte[]> {
    return this.http.get<Parte[]>(`${this.url}/users/${usuarioId}`);
  }

}
